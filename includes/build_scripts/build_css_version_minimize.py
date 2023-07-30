import re
import os

###########################################################################################
# Global / Utility
###########################################################################################

printPrefix = "[build_css_version_minimize.py]: "

warn = "[WARNING] " #"⚠️  "
err = "[ERROR] " #"⛔ "
info = "[INFO] " #"📎 "

def pprint(any):
    print(f"{printPrefix}{any}")

def stop(success):
    if(success):
        #pprint("✔ Completed successfully")
        pprint("Completed successfully")
    else:
        #pprint("✘ Ended prematurely")
        pprint("✘ Ended prematurely")
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
    
    def compareVersion(self, otherVersion):
        if(otherVersion == "0.0"):
            self.v = "1.0" # an "override" for certain files. Logging as to why is handled externally
            return
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

    def __init__(self, v, filename, jsfilename):
        self.v = v
        self.filename = filename
        self.jsfilename = jsfilename
    
    def __repr__(self):
        return f"({self.__str__()})"

    def __str__(self):
        return f"{self.jsfilename} > {self.filename}: {self.v}"
    
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

###########################################################################################
# Generate Version Objects & Increments
###########################################################################################
pprint(f"{info}Calculating version incrementes...")

prodVersions = re.findall("(?<=.css: )[0-9]+\.[0-9]+", prod_versions)
prodFilenames = re.findall("[a-zA-Z_0-9]+(?=.css: )", prod_versions)
prodParentFilenames = []
for cssfile in prodFilenames:
    # for .js parent files with multiple .css references to different css files in them
    # don't ask about the regex...
    res = re.search(f"[a-zA-Z_0-9]+(?=\.js: [0-9]+\.[0-9]+(\s+[a-zA-Z_0-9]*\.css: [0-9]+\.[0-9]+)*(\s+[a-zA-Z_0-9]*{cssfile}\.css: [0-9]+\.[0-9]+)+)", prod_versions)
    if res == None:
        pprint(f"{err}Could not find parent js file for {cssfile} in prod versions file")
        stop(False)
    prodParentFilenames.extend([res.group()])

prodVs = []
for i in range(len(prodFilenames)):
    prodVs.append(Version(prodVersions[i], prodFilenames[i], prodParentFilenames[i]))

currentVersions = []
currentFilenames = []
currentParentFilenames = []

for nfile in namedFiles:
    versionsFound = re.findall("(?<=.css\?v)[0-9]+\.+[0-9]+", nfile.contents)
    cssFilesFound = re.findall("[a-zA-Z_0-9]+(?=.css\?v)", nfile.contents)
    if(len(versionsFound) != len(cssFilesFound)):
        pprint(f"{err}Number of CSS file name references and CSS version references did not match. ({versionsFound}, {cssFilesFound})")
        stop(False)
    currentVersions.extend(versionsFound)
    currentFilenames.extend(cssFilesFound)
    currentParentFilenames.extend([f for f in [nfile.name] for _ in range(len(versionsFound))])

if(len(currentVersions) != len(currentFilenames) or len(currentFilenames) != len(currentParentFilenames)):
    pprint(f"{err}Found differring number of CSS file names, JS file names, and CSS versions.")
    stop(False)

currentVs = []
for i in range(len(currentVersions)):
    currentVs.append(Version(currentVersions[i], currentFilenames[i], currentParentFilenames[i]))

#de-duplicate while maximizing versions seen; probably not super necessary...
dedupedCVs = [] #init with 1 since first is unique
for cv in currentVs:
    duplicate = False
    for ddcv in dedupedCVs:
        if(ddcv.filename == cv.filename and ddcv.jsfilename == cv.jsfilename):
            duplicate = True
            if ddcv.compareVersion(cv.v) < 0:
                ddcv.v = cv.v
            pprint(f"{warn}Found duplicate JS-CSS pair: [{cv.jsfilename} > {cv.filename}]. Taking higest versioned reference ({ddcv.v})")
    if not duplicate:
        dedupedCVs.append(cv)

currentVs = dedupedCVs

#update versions or add new entries for new versions
for cv in currentVs:
    nameMatch = [pv for pv in prodVs if pv.filename == cv.filename and pv.jsfilename == cv.jsfilename]
    if len(nameMatch) == 0:
        pprint(f"{warn}File {cv.filename} not found in production version list. Adding at 1.0")
        cv.incrementVersion("0.0")
    else:
        pv = [pv for pv in prodVs if pv.filename == cv.filename and pv.jsfilename == cv.jsfilename][0].v
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
    if(re.search(f"(?<={cv.filename}.css: )[0-9]+\.[0-9]+", prod_versions) == None):
        pprint(f"{warn}Could not find {cv.filename} in production versions file. Adding new row under {cv.jsfilename}.")
        jsrow = re.search(f"{cv.jsfilename}.js: [0-9]+\.[0-9]+", prod_versions)
        if(jsrow == None):
            pprint(f"{err}Could not find parent JS file {cv.jsparent} for new CSS file {cv.filename}")
            stop(False)
        updated_prod_versions = re.sub(f"{jsrow.group()}", f"{jsrow.group()}\n    {cv.filename}.css: {cv.v}", updated_prod_versions)
    updated_prod_versions = re.sub(f"(?<={cv.filename}.css: )[0-9]+\.[0-9]+", f"{cv.v}", updated_prod_versions)

#delete unused versions
for pv in prodVs:
    nameMatch = [cv for cv in currentVs if cv.filename == pv.filename and cv.jsfilename == pv.jsfilename]
    if(len(nameMatch) == 0):
        pprint(f"{warn}Production file {pv.jsfilename} > {pv.filename} no longer exists. Removing row.")
        updated_prod_versions = re.sub(f"\s+{pv.filename}.css: [0-9]+\.[0-9]+", "", updated_prod_versions)

#clean up extra newlines...
updated_prod_versions = re.sub("\n\n", "\n", updated_prod_versions)

open("./prod-versions.ini", "w").write(updated_prod_versions)

###########################################################################################
# Update CSS Versions in-file
###########################################################################################
for cv in currentVs:
    pprint(f"{info}Updating {cv.jsfilename}.js for {cv.filename}.css to version {cv.v}...")
    jscontent = open(f"./includes/js/{cv.jsfilename}.js", "r").read()
    jscontent = re.sub(f"(?<={cv.filename}.css\?v)[0-9]+\.+[0-9]+", f"{cv.filename}.css?v{cv.v}", jscontent)
    #pprint(jscontent)
    #TODO: write f"./includes/js/{cv.jsfilename}.js" with jscontent

stop(True)