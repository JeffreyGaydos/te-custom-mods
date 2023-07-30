import re
import datetime

###########################################################################################
# Global / Utility
###########################################################################################

printPrefix = "[build_update_plugin_version.py]: "

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

class PluginVersion:
    def incrementVersion(self):
        v_forte = (int)(self.v.split(".")[0])
        v_mezzo = (int)(self.v.split(".")[1])
        v_piano = (int)(self.v.split(".")[2]) + 1
        if(v_piano < 0):
            pprint(f"{err}A negative value was found after attempting to increment plugin version")
        self.v = f"{v_forte}.{v_mezzo}.{v_piano}"
        

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
prod_versions = open("./prod-versions.ini", "r").read()
readme = open("./README.md", "r").read()
te_custom_mods = open("./te-custom-mods.php", "r").read()

###########################################################################################
# Generate Version Objects & Increments
###########################################################################################
pprint(f"{info}Calculating version increment...")

res = re.search("(?<=te-custom-mods: )[0-9]+\.[0-9]+\.[0-9-]+", prod_versions)

if res == None:
    pprint(f"{err}Could not find plugin version in ./prod-versions.ini")
    stop(False)

res = res.group()

v = PluginVersion(res, "[PLUGIN VERSION]")
v.incrementVersion()

###########################################################################################
# Update prod-versions.ini
###########################################################################################
pprint(f"{info}Updating prod-versions.ini...")

updated_prod_versions = prod_versions

updated_prod_versions = re.sub("(?<=te-custom-mods: )[0-9]+\.[0-9]+\.[0-9-]+", f"{v.v}", updated_prod_versions)

#clean up extra newlines...
updated_prod_versions = re.sub("\n\n", "\n", updated_prod_versions)
print(updated_prod_versions)
open("./prod-versions.ini", "w").write(updated_prod_versions)

pprint(v)

###########################################################################################
# Update README.md
###########################################################################################
pprint(f"{info}Updating README.md...")

updated_readme = readme

updated_readme = re.sub("(?<=te-custom-mods \| Current Version: )[0-9]+\.[0-9]+\.[0-9]+", f"{v.v}", updated_readme)

open("./README.md", "w").write(updated_readme)

###########################################################################################
# Update te-custom-mods.php
###########################################################################################
pprint(f"{info}Updating te-custom-mods.php...")

updated_te_custom_mods = te_custom_mods

updated_te_custom_mods = re.sub("(?<=Version: )[0-9]+\.[0-9]+\.[0-9]+", f"{v.v}", updated_te_custom_mods)

open("./te-custom-mods.php", "w").write(updated_te_custom_mods)

stop(True)