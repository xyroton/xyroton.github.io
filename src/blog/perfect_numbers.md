---
title: Perfect Numbers with Python
author: Astro Learner
description: "Find Perfect Numbers in a Split Second"
image:
  url: "/astro-blog/blog/perfect_nums.png"
  alt: "The word astro against an illustration of planets and stars."
pubDate: 2025-05-30
tags: ["python", "math"]
---

# What Are Perfect Numbers?

A **perfect number** is a positive integer that is equal to the sum of its proper positive divisors, excluding itself. For example:

For the number 6:

```
1 + 2 + 3 = 6
```

Divisors of 6 are:  
- 6 / 1 = 6  
- 6 / 2 = 3  
- 6 / 3 = 2  

These divisors (1, 2, and 3) add up to 6 — so 6 is a perfect number.


# The Basic Algorithm

The basic idea is to check whether a number `num` is divisible by another number `i`. If `num % i == 0`, we add `i` to a variable called `sum`.

We repeat this process for all values of `i` from 1 up to `num // 2`. If the sum of the divisors equals the original number, it’s a perfect number.

## Let’s Implement That in Python

```python
num = 2
c = 0  # counter for how many perfect numbers we've found

while c < 5:  # find the first five perfect numbers
    sum = 0
    i = 1

    while i <= num // 2:
        if num % i == 0:
            sum += i
        i += 1

    if sum == num:
        print(num)
        c += 1

    num += 1
```

### Output
```
6
28
496
8128
33550336 # very slow to find
```

This algorithm works fine for the first few perfect numbers, but it becomes very slow for larger ones (like the 5th perfect number: 33,550,336). Luckily, we can make this faster using **Mersenne Primes** and the **Euclid-Euler Theorem**.


# Mersenne Primes & the Euclid-Euler Theorem

## Mersenne Primes

Mersenne primes are prime numbers of the form:

$$
2^k - 1
$$

> Not every number of this form is prime. For example:

$$
2^{11} - 1 = 2047
$$

> And 2047 is **not** a prime number.

So we need to check whether each $(2^k - 1)$ is prime. 

## Euclid-Euler Theorem

Euclid proved that if $(2^k - 1)$ is prime (a Mersenne prime), then:

$$
(2^{k-1}) \times (2^k - 1)
$$

is a perfect number. This is known as the **Euclid-Euler Theorem**.

Let’s use this to build a faster algorithm.


## Improved Algorithm Using Euclid-Euler Theorem

```python
import math

def is_prime(n):
    if n < 2:
        return False
    for i in range(2, int(math.sqrt(n)) + 1):
        if n % i == 0:
            return False
    return True

count = 0
k = 2  # start checking from exponent 2

while count < 5:
    mersenne = 2**k - 1
    if is_prime(mersenne):
        perfect = 2**(k - 1) * mersenne
        print(perfect)
        count += 1
    k += 1
```

### Output
```
6
28
496
8128
33550336 
```


**Voilà!** With this optimized approach, finding large perfect numbers becomes significantly more efficient.

