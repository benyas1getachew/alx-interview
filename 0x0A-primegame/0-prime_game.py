#!/usr/bin/python3
"""0. Prime Game - Maria and Ben are playing a game"""


def isWinner(x, nums):
    """x - rounds
    nums - numbers list
    """
    if x <= 0 or nums is None:
        return None
    if x != len(nums):
        return None

    ben = 0
    maria = 0

    for n in nums:
        prime = [True for i in range(n+1)]
        p = 2
        while (p * p <= n):
            if (prime[p] == True):
                for i in range(p * p, n+1, p):
                    prime[i] = False
            p += 1
        
        j=0
        for p in range(2, n+1):
            if prime[p]:
                j+=1
        if j%2==0:
            ben+=1
        else:
            maria+=1
            
    if ben>maria:
        return "Ben"
    if maria > ben:
        return "Maria"
    return None
