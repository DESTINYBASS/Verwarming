import random
import matplotlib.pyplot as grafiek

def randomNumber():
    i = 0
    emptyArray = []
    times = []
    while i < 100:
        i = i+1
        times.append(i)
        randomInt = random.randint(0, 10)
        emptyArray.append(randomInt)
    # staafgrafiek("random numbers", times, emptyArray, "number", "amount")
    return emptyArray

def staafgrafiek(titel, labels, getallen1, xlabel, ylabel):
    grafiek.clf()
    grafiek.plot(labels, getallen1)
    grafiek.xlabel(xlabel, fontsize=15)
    grafiek.ylabel(ylabel, fontsize=15)
    grafiek.title(titel)
    grafiek.savefig(titel + ".png")

print(randomNumber())