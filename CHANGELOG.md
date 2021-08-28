# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),


## [Unreleased] 

### Added

- Add Follow Activity block type

### Fixed

- Fix (Un).(Follow/Likes) Actions
- Fix On logout remove default authorization header
- Fix Responsive for activity type of follow
- Fix Activiy type follow
- Fix Classification, Lowercase issues

### Change

- Change FileMeta, Hide score(avg) when its not available
- Change `Unlik` to `Unlike`
- Change key `timestamp` to `date`
- Chanage Icons, Colors of Classification func
- Change Displayed activities to all on latest activities


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
