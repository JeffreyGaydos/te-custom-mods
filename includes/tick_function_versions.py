import os

modifiedBarrier = 1676340527.3468027

functions = open("./includes/tec-functions.php", "r")
rawText = functions.read()
arrayText = rawText.split("__FILE__), '', '")
# files = ""
# for file in arrayText:
#     indexStart = file.find("plugins_url")
#     if os.path.getmtime('includes' + file[(indexStart + 13):-3]) >= modifiedBarrier:
#         files += file[(indexStart + 13):-3] + ','
#     print((str)(os.path.getmtime('includes' + file[(indexStart + 13):-3])) + file[(indexStart + 13):-3])

# print(files)
# arrayFile = files.split(',')

updatedText = arrayText[0]
arrayText.remove(arrayText[0])
#Test data
#arrayText.append("22.3'")
#arrayText.append("222.3'")
#os.path.getmtime()
i = 0
for text in arrayText:
    fileStart = text.find("plugins_url")
    fileEnd = text.find("'", fileStart)
    print(fileStart + ', ' + fileEnd)
    indexEnd = text.find("'")
    finalValue = ""
    if os.path.getmtime('includes' + text[(fileStart + 13):fileEnd]) >= modifiedBarrier:
        finalValue = (str)((float)(text[0:indexEnd]) + 0.1)
    else:
        finalValue = (str)((float)(text[0:indexEnd]) + 0.0)
    indexTenth = finalValue.find(".") + 2
    print(text[0:indexEnd] + ' >> ' + (finalValue[0:indexTenth]))
    finalValue = finalValue[0:indexTenth]
    updatedText += "'" + finalValue + text[indexEnd:-1]

#print(updatedText)

#Write to file
writer = open("./includes/tec-functions.php", "w")
writer.write(updatedText)