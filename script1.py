import random
import matplotlib.pyplot as grafiek

def randomNumber():
    randomInt = random.randint(0, 10)
    return randomInt
    # staafgrafiek("random numbers", times, emptyArray, "number", "amount")

def staafgrafiek(titel, labels, getallen1, xlabel, ylabel):
    grafiek.clf()
    grafiek.plot(labels, getallen1)
    grafiek.xlabel(xlabel, fontsize=15)
    grafiek.ylabel(ylabel, fontsize=15)
    grafiek.title(titel)
    grafiek.savefig(titel + ".png")

print(randomNumber())