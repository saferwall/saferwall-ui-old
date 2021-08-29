# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),


## [Unreleased] - 2021-08-29

### Fixed

- Fix Profile following tab
- Fix the padding of activities of profile in mobile 

# [1.1.1] 2021-08-28

### Added

- Add New type to activity: Follow

### Fixed

- Fix (Un).(Follow/Likes) Actions
- Fix on logout remove default authorization header
- Fix of the responsiveness for the type follow activity
- Fix activity type follow
- Fix classification, Lowercase issues

### Change

- Change FileMeta, Hide score(avg) when its not available
- Change `Unlik` to `Unlike`
- Change key `timestamp` to `date`
- Chanage Icons, Colors of Classification func
- Change the displayed activities to all the most recent ones


## [1.1.0] - 2021-08-27

### Added

- Add Show Moe Button on Profile Tabs
- Add Pagination on Profile Tabs (Likes, Submissions, ..)
- Add File infomration on Profile Comments Tab
- Add Dynamic routing for the Profile Tabs

### Fixed

- Fix Meta file with empty filename
- Fix Auth by fetching user on the success logging
- Fix Profile Tabs (API format changed)
- Fix Short activities of Profile Tabs
