import re
import datetime
import argparse

###########################################################################################
# Global / Utility
###########################################################################################

printPrefix = "[dev_tick_js.py]: "

warn = "[WARNING] " #"⚠️  "
err = "[ERROR] " #"⛔ "
info = "[INFO] " #"📎 "

def pprint(any):
    print(f"{datetime.datetime.now()} {printPrefix}{any}")


def stop(success):
    if(success):
        #pprint("✔ Completed successfully")
        pprint("Completed successfully")
    else:
        #pprint("✘ Ended prematurely")
        pprint("Ended prematurely")
    exit()

###########################################################################################
# Version Object Definition
###########################################################################################

class DevVersion:
    def incrementVersion(self):
        v_forte = (int)(self.v.split(".")[0])
        v_mezzo = (int)(self.v.split(".")[1]) + 1
        self.v = f"{v_forte}.{v_mezzo}"
        

    def __init__(self, v, filename):
        self.v = v        
        self.filename = filename  
    
    def __repr__(self):
        return f"({self.__str__()})"

    def __str__(self):
        return f"{self.filename}: {self.v}"

###########################################################################################
# Open Files
###########################################################################################
parser = argparse.ArgumentParser()
parser.add_argument("-f", "--filename", type=str)

args = parser.parse_args()
file = args.filename

pprint(f"{info}Ticking for file {file}...")

tec_functions = open("./includes/tec-functions.php", "r").read()

###########################################################################################
# Generate Version Objects & Increments
###########################################################################################
pprint(f"{info}Calculating version incrementes...")

extractName = re.search(f"(?<=.includes.js.)tec_.*(?=\.js)", file)
if extractName == None:
    pprint(f"{err}Could not get filename without extension or absolute path from path: {file}")

v = DevVersion(None, extractName.group())

report = extractName.group()

tec_version = re.search(f"(?<=plugins_url\('/js/{v.filename}.js', __FILE__\), '', ')[0-9]+\.+[0-9]+", tec_functions)
if tec_version == None:
    pprint(f"{err}Could not find file {v.filename}")
    stop(False)

v.v = tec_version.group()

report += ": " + tec_version.group() + " > "

v.incrementVersion()

report += v.v

pprint(f"{info}{report}")

###########################################################################################
# Update tec-functions.php
###########################################################################################
pprint(f"{info}Updating tec-functions.php...")

updated_tec_functions = tec_functions

updated_tec_functions = re.sub(f"(?<=plugins_url\('/js/{v.filename}.js', __FILE__\), '', ')[0-9]+\.+[0-9]+", f"{v.v}", updated_tec_functions)

open("./includes/tec-functions.php", "w").write(updated_tec_functions)

stop(True)