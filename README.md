<img height="64" src="./assets/logo.jpg" alt="Enforce Private Repos">

# Enforce Private Repos on BitBucket

> "BitBucket Cloud add-on" that enforces new repositories to be private

[![Uptime Robot status](https://img.shields.io/uptimerobot/status/m780971964-38a41ce4f8411ad75507fb6e.svg)](https://stats.uptimerobot.com/5RQ4ot5wz/780971964)
[![David badge](https://david-dm.org/ewolfe/enforce-private-repos-bb.svg)](https://david-dm.org/ewolfe/enforce-private-repos-bb)

## The Problem

Humans make mistakes, sometimes we forget to mark a repository as private when we first create it.

This can lead to all of our source code being accidentally published publicly on the internet for a few months before anyone notices. (Yep, this happened!)

## This Solution

This project is a micro-service that works by listening for events within your BitBucket account. Specifically, it looks for the `repo:created` event. Once this service gets a notification, it will check the `is_private` attribute and if it’s `false` then it will update it to `true`. That’s literally it.

<a href="./assets/screenshot-install.png">
  <img align="center" style="width: 100%; max-width: 1200px;" src="./assets/demo.gif" />
</a>

## Install

1. Visit https://bitbucket.org/account/addon-management
1. Click "Install add-on from URL"
1. Enter `https://enforce-private-repos-on-bb.herokuapp.com/` into the input field
1. Click the "Install" button

<a href="./assets/screenshot-install.png">
  <img align="center" style="width: 100%; max-width: 1312px;" src="./assets/screenshot-install.png" />
</a>

## Beware

This add-on is "Set it and forget it". With that said, keep in mind that this service _only_ works when creating a brand new project. It doesn't prevent someone from manually setting the visibility to public in the future.

---

### Developer Notes

These are here for my future self or anyone looking to contribute and get caught up with BitBucket Cloud.

- [BitBucket Cloud add-ons](https://confluence.atlassian.com/bitbucket/bitbucket-cloud-add-ons-780871938.html)
- [Integrating with BitBucket Cloud](https://developer.atlassian.com/cloud/bitbucket/integrating-with-bitbucket-cloud/?utm_source=%2Fbitbucket%2Fguides%2Fintroduction.html)

---

## Credits

- Logo background sampled from [AS15-99-13488](https://www.flickr.com/photos/47222633@N05/33353663734)
- Logomark by [Gregor Cresnar](https://thenounproject.com/term/lock/969546/)

## License

MIT
