printPrefix = "[build_css_version_tick.py]: "

majorUpdate = 0

def versionCompare(v1, v2):
    v1_major = (float)(v1.split(".")[0])
    v1_minor = -1.0
    if(v1.__contains__(".")):
        v1_minor = (float)(v1.split(".")[1])
    v2_major = (float)(v2.split(".")[0])
    v2_minor = -1.0
    if(v2.__contains__(".")):
        v2_minor = (float)(v2.split(".")[1])
    if(v1_major < v2_major):
        return -2
    if(v2_major < v1_major):
        return 2
    if(v1_minor < v2_minor):
        return -1
    if(v2_minor < v1_minor):
        return 1
    return 0

import os

print(printPrefix + "Minimizing CSS version numbers based on prod values...")

prod = open("../../prod-versions.ini", "r")
prodStr = prod.read()
pluginProd = prodStr.split("\n")[-1:][0]
prod = prodStr.split("\n")[:-1]
prodCSS = []
for p in prod:
    if(p.startswith("    ")):
        prodCSS.append(p.replace("    ", ""))
prodUnfoundCSS = []
for pcss in prodCSS:
    prodUnfoundCSS.append(pcss)

filesToCheck = []
for dir in os.listdir("../js"):
    if(dir.__contains__(".")):
        filesToCheck.append("../js/" + dir)
# for dir in os.listdir(".."):
#     if(dir.__contains__(".")):
#         filesToCheck.append("../" + dir)
print(printPrefix + "Looking for CSS references in files:")
i = 0
for file in filesToCheck:
    filer = open(file, "r")
    filer = filer.read()
    if(filer.__contains__(".css?v")):
        print(printPrefix + "Found CSS ref(s) in file " + file)
        endsInCSS = filer.split(".css?v")[:-1]
        beginsInVersion = filer.split(".css?v")[1:]
        js = file.replace("../js", "")[1:]
        csss = []
        cssvs = []
        prodCssvs = []
        for end in endsInCSS:
            i = end.rindex("/")
            csss.append(end[i + 1:] + ".css")
        for beg in beginsInVersion:
            i = beg.index("\"")
            cssvs.append(beg[0:i])
        cssi = 0
        update = ""
        for css in csss:
            version = 1.0
            for pcss in prodCSS:
                if(pcss.split(":")[0] == css):
                    update = pcss
                    prodVersion = pcss.split(":")[1][1:]
                    prodUnfoundCSS.remove(pcss)
                    #prodCssvs.append(pcss.split(":")[1][1:])
                    vcomp = versionCompare(prodVersion, cssvs[cssi])
                    if(vcomp < 0):
                        if(vcomp == -2):
                            #major update - increments prod major version, but at .0
                            version = (float)((int)((float)(prodVersion) + 1.0))
                        else:
                            #minor update - increments prod minor version
                            version = (float)(prodVersion) + 0.1
                    elif(vcomp == 0):
                        update = "skip"
                    break
            #we couldn't find the css name in the prod versions file. Add it
            if(update.__len__() > 0):
                if(update == "skip"):
                    print(printPrefix + "SKIP: " + css + " did not need updated")
                    continue
                prodStr = prodStr.replace("    " + update + "\n", "")
                update = ""
                print(printPrefix + "UPDATE: " + css + " to version " + (str)(version))
            else:
                print(printPrefix + "NEW: " + css + " at version " + (str)(version))

            #add version to prod-versions.ini
            newProdStr = ""
            prodSplit = prodStr.split(js)
            newProdStr += prodStr.split(js)[0]
            newProdStr += js
            newProdStr += prodStr.split(js)[1][0:prodStr.split(js)[1].index("\n")]
            newProdStr += "\n" + "    " + css + ": " + (str)(version)
            newProdStr += prodStr.split(js)[1][prodStr.split(js)[1].index("\n"):]
            prodStr = newProdStr

            #add version to original js file
            newfile = filer.split(css)[0]
            newfile += "?v" + (str)(version)
            newfile += filer.split(css)[1][filer.split(css)[1].index("\""):]
            #print(newfile)
            #filew = open(file, "w")
            #filew.write(newfile)
            cssi += 1

print(printPrefix + "Found " + (str)(prodUnfoundCSS.__len__()) + " deleted CSS files")
if(prodUnfoundCSS.__len__() > 0):
    for unfound in prodUnfoundCSS:
        print(printPrefix + "DELETE: " + unfound + " was not found in any js files. Removing from prod-versions.ini")
        prodStr = prodStr.replace("    " + unfound + "\n", "")
#write updates to prod file
# print(prodStr)
prodw = open("../../prod-versions.ini", "w")
prodw.write(prodStr)