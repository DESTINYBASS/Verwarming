import random

def randomNumber():
    i = 0
    emptyArray = []
    times = []
    while i < 100:
        i = i+1
        times.append(i)
        randomInt = random.randint(0, 10)
        emptyArray.append(randomInt)
    return emptyArray

print(randomNumber())