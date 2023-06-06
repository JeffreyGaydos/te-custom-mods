printPrefix = "[build_js_version_tick.py]: "
majorUpdate = 0

def versionCompare(v1, v2):
    v1_major = (float)(v1.split(".")[0])
    v1_minor = (float)(v1.split(".")[1])
    v2_major = (float)(v2.split(".")[0])
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

print(printPrefix + "Minimizing JS version numbers based on prod values...")

functions = open("../tec-functions.php", "r")
prod = open("../../prod-versions.ini", "r")
prodStr = prod.read()
pluginProd = prodStr.split("\n")[-1:][0]
prod = prodStr.split("\n")[:-1]
rawText = functions.read()
arrayText = rawText.split("__FILE__), '', '")
# files = ""
# for file in arrayText:
#     indexStart = file.find("plugins_url")
#     if os.path.getmtime('includes' + file[(indexStart + 13):-3]) >= modifiedBarrier:
#         files += file[(indexStart + 13):-3] + ','
#     print((str)(os.path.getmtime('includes' + file[(indexStart + 13):-3])) + file[(indexStart + 13):-3])
filename = arrayText[0][arrayText[0].index("'/js/tec_"):]
#print("filename: " + filename)
# print(files)
# arrayFile = files.split(',')
updatedText = arrayText[0]
arrayText.remove(arrayText[0])

#Test data
#arrayText.append("22.3'")
#arrayText.append("222.3'")
#os.path.getmtime()
#print(os.listdir("../js"))
finalVersions = []

prodfiles = []
for prodvalue in prod:
    prodfiles.append(prodvalue.split(":")[0])

i = 0
for text in arrayText:
    #new file detection
    if(not prodfiles.__contains__(filename.replace("'", "")[4:-2])):
        prod_orig = open("../../prod-versions.ini", "r").read()
        # print(prod_orig)
        prod_orig_js = prod_orig.split("te-custom-mods")[0][:-1] #there is a newline at the end...
        prod_orig_plugin = prod_orig.split("te-custom-mods")[1]
        prodw = open("../../prod-versions.ini", "w")
        prodw.write(prod_orig_js + "\n" + filename.replace("'", "")[4:-2] + ": 1.0" + "\n" + "te-custom-mods" + prod_orig_plugin)
        prod.append(filename.replace("'", "")[4:-2] + ": 1.0")
        finalVersions.append("1.0")
        print(printPrefix + "NEW: '" + filename.replace("'", "")[4:-2] + "' at version 1.0")
        continue

    fileStart = text.find("plugins_url")
    fileEnd = text.find("'", fileStart)
    indexEnd = text.find("'")
    currentValue = (text[0:indexEnd])
    
    if(prod[i].startswith("    ")): #skip CSS versions
        i += 1
        if(i == prod.__len__()): #if a CSS version is at the end of the version file        
            continue
    minorProdUpdated = (int)(prod[i].split(":")[1].split(".")[1]) + 1
    majorProd = (int)(prod[i].split(":")[1].split(".")[0])

    updateResponse = versionCompare(prod[i].split(":")[1], currentValue)
    update = currentValue
    if(updateResponse < 0):
        if updateResponse == -2:
            print(printPrefix + "Major version update. Setting global flag")
            majorUpdate = 1
            minorProdUpdated = 0
        update = (str)((int)(currentValue.split(".")[0])) + "." + (str)(minorProdUpdated)
        print(printPrefix + "UPDATE: " + filename[:-2] + " to version " + (str)(update))

    updatedText += "'" + (str)(update) + text[indexEnd:-1]
    finalVersions.append(update)
    if(i < prod.__len__() - 1): #there's a newline at the end...
        filename = text[text.index("'/js/tec_"):]
        #print("filename: " + filename)
        
    i += 1
    if(i == prod.__len__()):
        break #abort if we are about to go out of range

updatedText += "}"

#Write to file
print(printPrefix + "Writing updates to tec-functions.php")
# print(updatedText)
writer = open("../includes/tec-functions.php", "w")
writer.write(updatedText)
pluginVersionOrig = pluginProd.split(":")[1][1:]
pluginVersions = pluginProd.split(":")[1][1:].split(".")
pluginVersions[2] = (str)((int)(pluginVersions[2]) + 1)
if majorUpdate == 1:
    pluginVersions[1] = (str)((int)(pluginVersions[1]) + 1)
    pluginVersions[2] = "0"
pluginVersionFinal = pluginVersions[0] + "." + pluginVersions[1] + "." + pluginVersions[2]

print(printPrefix + "te-custom-mods release version: " + pluginVersionOrig + " >> " + pluginVersionFinal)

print(printPrefix + "Writing updates back to prod-versions.ini")
finalProdVersions = ""
j = 0
for prodLine in prod:
    if(prodLine.startswith("    ")): #skip CSS versions
        continue
    finalProdVersions += prodLine.split(":")[0] + ": " + finalVersions[j] + "\n"
    j += 1
finalProdVersions += "te-custom-mods: " + pluginVersionFinal
# print(finalProdVersions)
prodw = open("../../prod-versions.ini", "w")
prodw.write(finalProdVersions)

print(printPrefix + "Versioning tick completed")