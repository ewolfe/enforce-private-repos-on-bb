module.exports = function(app, addon) {
  app.get("/healthcheck", function(req, res) {
    res.send(200);
  });

  app.get("/", function(req, res) {
    res.format({
      "text/html": function() {
        res.redirect("/atlassian-connect.json");
      },
      "application/json": function() {
        res.redirect("/atlassian-connect.json");
      }
    });
  });

  app.post("/webhook", addon.authenticate(), function(req, res) {
    if (
      req.body.event === "repo:created" &&
      !req.body.data.repository.is_private
    ) {
      var httpClient = addon.httpClient(req);
      httpClient.put(
        {
          url: `https://api.bitbucket.org/1.0/repositories/${
            req.body.data.repository.full_name
          }`,
          multipartFormData: {
            is_private: "true"
          }
        },
        function(err, resp, data) {
          // no callback yet
        }
      );
    }
    res.send(204);
  });
};
