## Google Sheets Automation: Uncheck Checkboxes After One Minute

This Google Apps Script automates the process of unchecking checkboxes in a Google Sheets document one month after they have been checked. The script records the timestamp when the checkbox is checked and uses this to determine when to uncheck it.

### Overview

The provided script performs the following tasks:

- Records the timestamp when a checkbox is checked.
- Unchecks the checkbox one minute after it has been checked.
- Runs a time-driven trigger every minute to check and uncheck the appropriate checkboxes.

### How It Works

1. onEdit(e): When a user checks a checkbox in column C, the script captures the current timestamp plus one minute and stores it in column E of the same row.
2. uncheckExpired(): This function runs every minute. It checks the timestamps in column E. If the current time is past the timestamp, it will uncheck the checkbox in column C and clear the timestamp in column E.
3. createTimeDrivenTrigger(): This function sets up a time-driven trigger that ensures uncheckExpired() runs every minute.