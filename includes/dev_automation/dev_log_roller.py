###########################################################################################
# Global / Utility
###########################################################################################
maxLogLength = 100000

###########################################################################################
# roll log
###########################################################################################
log = open("./includes/dev_automation/log.txt", "r").read()

if len(log) > maxLogLength:
    begIndex = len(log) - maxLogLength
    log = log[begIndex:]

open("./includes/dev_automation/log.txt", "w").write(log)