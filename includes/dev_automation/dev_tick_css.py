import re
import datetime
import argparse
import os

###########################################################################################
# Global / Utility
###########################################################################################

printPrefix = "[dev_tick_css.py]: "

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

    def compareVersion(self, otherVersion):
        v_major = (int)(self.v.split(".")[0])
        v_minor = (int)(self.v.split(".")[1])
        other_major = (int)(otherVersion.split(".")[0])
        other_minor = (int)(otherVersion.split(".")[1])
        if(v_major < other_major):
            return -2
        elif(other_major < v_major):
            return 2
        elif(v_minor < other_minor):
            return -1
        elif(other_minor < v_minor):
            return 1
        else:
            return 0
        

    def __init__(self, v, filename):
        self.v = v        
        self.filename = filename  
    
    def __repr__(self):
        return f"({self.__str__()})"

    def __str__(self):
        return f"{self.filename}: {self.v}"

class NamedString:
    def __init__(self, name, contents):
        self.name = name
        self.contents = contents

    def __repr__(self):
        return f"\n##############################################\n{self.name}:\n----------------------------------------------\n{self.contents[:100]}\n##############################################\n"

###########################################################################################
# Open Files
###########################################################################################
pprint(f"{info}Openning files...")
namedFiles = []
for dir in os.listdir("./includes/js"):
    if(dir.__contains__(".")):
        namedFiles.append(NamedString(re.sub("\.js$", "", dir), open(f"./includes/js/{dir}").read()))
prod_versions = open("./prod-versions.ini", "r").read()

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

extractName = re.search(f"(?<=.includes.css.)tec_.*(?=\.css)", file)
if extractName == None:
    pprint(f"{err}Could not get filename without extension or absolute path from path: {file}")
v = DevVersion(None, extractName.group())
report = extractName.group()

jsToTick = []
for nf in namedFiles:
    cssSearch = re.search(f"(?<={v.filename}\.css\?v)[0-9]+\.[0-9]+", nf.contents)
    if cssSearch != None:
        if(v.v == None or (v.compareVersion(cssSearch.group()) < 0)):
            v.v = cssSearch.group()
        jsToTick.append(nf)

if(len(jsToTick) == 0):
    pprint(f"{warn}Saved CSS {file} is not referenced in any JS files...")

v.incrementVersion()

for js in jsToTick:
    replaced_content = re.sub(f"(?<={v.filename}\.css\?v)[0-9]+\.[0-9]+", f"{v.v}", js.contents)
    open(f"./includes/js/{js.name}.js", "w").write(replaced_content)

###########################################################################################
# Update js files
###########################################################################################

for js in jsToTick:
    pprint(f"{info}Ticking for file {js.name}.js...")

    jsv = DevVersion(None, js.name)

    report = js.name

    tec_version = re.search(f"(?<=plugins_url\('/js/{jsv.filename}.js', __FILE__\), '', ')[0-9]+\.+[0-9]+", tec_functions)
    if tec_version == None:
        pprint(f"{err}Could not find file {jsv.filename}")
        stop(False)

    jsv.v = tec_version.group()

    report += ": " + tec_version.group() + " > "

    jsv.incrementVersion()

    report += jsv.v

    pprint(f"{info}{report}")

    ###########################################################################################
    # Update tec-functions.php
    ###########################################################################################
    pprint(f"{info}Updating tec-functions.php...")

    updated_tec_functions = tec_functions

    updated_tec_functions = re.sub(f"(?<=plugins_url\('/js/{jsv.filename}.js', __FILE__\), '', ')[0-9]+\.+[0-9]+", f"{jsv.v}", updated_tec_functions)

    open("./includes/tec-functions.php", "w").write(updated_tec_functions)

stop(True)