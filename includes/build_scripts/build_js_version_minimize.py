import re
import datetime

###########################################################################################
# Global / Utility
###########################################################################################

printPrefix = "[build_js_version_minimize.py]: "

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

class Version:
    def incrementVersion(self, prodVersion):
        if(prodVersion == "0.0"):
            self.v = "1.0" # an "override" for certain files. Logging as to why is handled externally
            return
        v_major = (int)(self.v.split(".")[0])
        v_minor = (int)(self.v.split(".")[1])
        prod_major = (int)(prodVersion.split(".")[0])
        prod_minor = (int)(prodVersion.split(".")[1])
        if(v_major < prod_major):
            pprint(f"{warn}Prod major version for {self.filename} was greater than current version. Setting current version ({self.v}) to prod version ({prodVersion})")
            self.v = prodVersion
        elif(prod_major < v_major):
            self.v = prod_major + 1 # always X.0
            pprint(f"Updated {self.filename} to version {self.v} (major)")
        elif(v_minor < prod_minor):
            pprint(f"{warn}Prod minor version for {self.filename} was greater than current version. Setting current version ({self.v}) to prod version ({prodVersion})")
            self.v = prodVersion
        elif(prod_minor < v_minor):
            self.v = f"{v_major}.{prod_minor + 1}"
            pprint(f"Update {self.filename} to version {self.v} (minor)")
        else:
            pprint(f"No updates necessary for {self.filename} ({self.v})")
        self.v = (str)((float)(self.v)) # ensures that we are both a string and have the possibly unnecessary X.0 at the end

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
pprint(f"{info}Openning files...")
tec_functions = open("./includes/tec-functions.php", "r").read()
prod_versions = open("./prod-versions.ini", "r").read()

###########################################################################################
# Generate Version Objects & Increments
###########################################################################################
pprint(f"{info}Calculating version incrementes...")

res = re.search("__FILE__\), '', '", tec_functions)

prodVersions = re.findall("(?<=.js: )[0-9]+\.[0-9]+", prod_versions)
prodFilenames = re.findall("[a-zA-Z_0-9]+(?=.js: )", prod_versions)

filenames = re.findall("(?<=plugins_url\('/js/)[a-zA-Z_0-9]+(?=.js)", tec_functions)
versions = re.findall("(?<=__FILE__\), '', ')[0-9]+\.+[0-9]+", tec_functions)

if len(prodVersions) != len(filenames) or len(versions) != len(prodVersions):
    pprint(f"{warn}Number of production versions found did not match number of current versions")

currentVs = []
prodVs = []
for i in range(len(filenames)):
    currentVs.append(Version(versions[i], filenames[i]))

for i in range(len(prodFilenames)):
    prodVs.append(Version(prodVersions[i], prodFilenames[i]))

#update versions or add new entries for new versions
for cv in currentVs:
    nameMatch = [pv for pv in prodVs if pv.filename == cv.filename]
    if len(nameMatch) == 0:
        pprint(f"{warn}File {cv.filename} not found in production version list. Adding at 1.0")
        cv.incrementVersion("0.0")
    else:
        pv = [pv for pv in prodVs if pv.filename == cv.filename][0].v
        cv.incrementVersion(pv)

#now updated to their "final" values
pprint(f"Final Versions: {currentVs}")

###########################################################################################
# Update prod-versions.ini
###########################################################################################
pprint(f"{info}Updating prod-versions.ini...")

updated_prod_versions = prod_versions

#update & add versions
for cv in currentVs:
    if(re.search(f"(?<={cv.filename}.js: )[0-9]+\.[0-9]+", prod_versions) == None):
        pprint(f"{warn}Could not find {cv.filename} in production versions file. Adding new row.")
        updated_prod_versions += (f"\n{cv.filename}.js: {cv.v}")
    updated_prod_versions = re.sub(f"(?<={cv.filename}.js: )[0-9]+\.[0-9]+", f"{cv.v}", updated_prod_versions)

#delete unused versions
for pv in prodVs:
    nameMatch = [cv for cv in currentVs if cv.filename == pv.filename]
    if(len(nameMatch) == 0):
        pprint(f"{warn}Production file {pv.filename} no longer exists. Removing row.")
        updated_prod_versions = re.sub(f"{pv.filename}.js: [0-9]+\.[0-9]+", "", updated_prod_versions)

#clean up extra newlines...
updated_prod_versions = re.sub("\n\n", "\n", updated_prod_versions)

open("./prod-versions.ini", "w").write(updated_prod_versions)

###########################################################################################
# Update tec-functions.php
###########################################################################################
pprint(f"{info} Updating tec-functions.php...")

updated_tec_functions = tec_functions

#update versions
for cv in currentVs:
    updated_tec_functions = re.sub(f"(?<=plugins_url\('/js/{cv.filename}.js', __FILE__\), '', ')[0-9]+\.+[0-9]+", f"{cv.v}", updated_tec_functions)

open("./includes/tec-functions.php", "w").write(updated_tec_functions)

stop(True)