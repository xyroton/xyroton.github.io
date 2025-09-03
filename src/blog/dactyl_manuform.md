---
title: The Dactyl Manuform Keyboard
author: Xyroton

description: "A DIY ortholinear split keyboard with a keywell."
image:
  url: "/posts/"
  alt: ""
pubDate: 2025-05-30
tags: ["Keyboards", "Ergonomics"]
---

The Dactyl Manuform is a DIY ortholinear split keyboard with a keywell. In the following I will describe the experience of building and using it. 
After 1 year.

# Design Choices and how they Feel
Explain why we mention everything
## Split
As the name suggests, it splits the keyboard in half  shown in the image below. 

![Split vs None Split](/posts/dactyl_manuform/split.png)


This makes it possible to position each keyboard half where it feels most comfortable for you. Generally you would want to place the keyboard halves relative to your shoulder width apart to allow for an open shoulder and back position. This simultaneously also allows for a natural wrist position, by now not having to bend your wrist outward anymore as.



This is generally understood as the biggest selling point of a split keyboard. 

## Ortholinear
Traditional keyboards have a staggered  key arrangement. Which means keys are not vertically aligned (see image below). 

![Staggered vs Ortholinear](/posts/dactyl_manuform/ortholinear.png)

This will lead to unnecessary left and right motion when typing and moving between rows.
This extra effort will be eliminated on ortholinear keyboard, since it allows your fingers to travel up and down in a straight line without having these micro left and right motions.


Note: Ortholinear really only makes sense on a split keyboard, since on a normal but ortholinear Keyboard one would need to bend ones wrists quite heavily in order to be able to move the fingers in a straight line  up and down. 

## Keywell
Some people treat this as a gimmick (most likely because they have never actually typed a Keyboard with one), but let me tell you it is not. Even if you have not yet fully learned to  type on it you will be able to tell the difference. For one, the distance to move from one row to the next become smaller, and secondly the change of motion is not as noticeable/none existent. By that I mean, for instance, moving you finger from the home row on a traditional keyboard (is the row where your fingers naturally rest on the f and j key) to one row above it (R3) to press a key there. That requires you to move you finger forward over the key and then change to a downward motion in order to press it.
On a keyboard with a keywell this motion somewhat combines into one, where to press a key one row above the home row, it is more matter of only pushing your finger forward without now having to switch to a full downward motion again.
Also note that the columns have a different height. For example the pinky row sits higher then the ring finger, to compensate for it beings shorter then other fingers. In addition, the columns shift slightly forward or backwards depending on the corresponding finger . 

## Thumb Cluster
In fairness I have to say that I can only share my opinion about the default 6 key thumb cluster, since there are different variations of thumb clusters, and that is the only one with which I have personal experience. So the following might be completely invalid for other thumb cluster designs. Although one thing they all have in common is, that they are not flat. Instead the thumb cluster falls down inwards and therefor one is pressing the keys not fully with the side of the thumb but also partially with the thumb pad. The motion itself becomes now more of a grabbing than a slapping down motion. This is particularly nice if one is typing with floating hands because this makes it easy to press the keys from different angles, but it can make the use a bit more difficult in combination with a palm rest. 
With all that said, I am not a big fan of the thumb cluster, simply due to misplacement of the two primary keys. Neither of them is in a comfortable enough spot to serve as a primary action key for me, such as space bar. The comfort zone would be right in between those two.
Though that problem could be evaded by simply picking a different thumb cluster to begin with, or by changing the thumb key positions manually in the configurator. More about that later.

## Tenting
Means your keyboard is not sitting flat on the table. Instead each keyboard half is slightly elevated on the inside, allowing you to type with your hands in a slightly outward rotated position. This is also the natural resting positions of your hands which you can check by standing up straight and letting your arms hang relaxed on the side. As you will observe, your palms will not face fully backwards.
There are a few different ways to achieve tenting. The cheapest way is to placing books under the inside of each half. More Luxurious ways are using stands with mag safe mounting you Keyboard half's on those and tilting it or even using clamps for meant for cameras. The community is fairly creative here.

The Dactyl-Manuform however comes with some degree of tenting already build in, which you also can adjust to your liking when designing you own case.

# Build
Creating a Dactyl-Manuform is a very labor intensive undertaking when compared to keyboards that are build using PCB as a base, such as the Ferris Sweep. Therefore it is important to determine for yourself if the effort is worth it. If not there are plenty of sellers on AliExpress or Etsy who offer prebuilt ones.


## Case
It is possible to find ready to go Dactyl-Manuform cases on any of the big 3D Model sharing Platforms such as Printables or Makerworld. But using these ready to go models does not align with the spirit of the Dactyl-Manuform.
The Dactyl-Manuform features a parametric design, which means one can change parameters around to change certain design aspects of it such as, tenting angle, keywell curvature or thumb cluster layout. You do this by utilizing one of the specic Dactyl-Manuform configurators.

### Configurator
The popular choice these days is the [Cosmos Keyboard Generator](https://ryanis.cool/cosmos/), which in comparison to other configurators is relatively easy to use since you use it through the official website with its nice GUI to modify things, and you do not have to manually set up a local build environment. It also has good documentation about how to use the configurator and build your own Dactyl-Manuform.
Another decent option, which is the one I chose, is one of locally based [Python Generators](https://github.com/joshreve/dactyl-keyboard). ButIf you are not coming from the programing world these can be cumbersome for you to use for various reasons.
The reason for me not to use Cosmos back then was, that the python based Generator had better edge placement which looked visually more pleasing.
But Cosmos has come a long way since then and is probably the better choice now.

### Printing
Since the Dactyl-Manuform is meant to be configured to ones personal needs, one will need to 3D print the case. It is best of course to own a capable 3D printer, to potentially play around with different designs. I can highly recommend the BambuLab A1, that is what I personaly use. Else you can also use a 3D online printing service such as [JLC](https://jlc3dp.com/), though I have no personal experience with them. 


## Parts you need
- **1x Right Case/1x Left Case:** Most cases are printed in PLA as is mine, some fancier ones are printed in Resin or even Nylon.
- **2x MCU Holders:** Different Cases need different designs, and often different MCUs need also slightly different designs.
- **xx Switches:** The amount of switches you need depends on form factor of Dactyl Manuform case that you picked, for me it was 80 switches. Usually you would want MX style switches, although if your case supports it other switches are possible such as Kailh Choc.
- **xx Keycaps:** Same amount as switches. Usually you would want them with the SA profile for the Dactyl Manuform to complement the keywell.
- **2x MCUs:** Pro Micro RP2040, is preferd over the ATmega32U insofar as it has more flash memory.
- **2x TRS Jacks (wired version):** You can also use TRRS but then you have to make sure you solder to the same contacts on each side.
- **xx Diodes:** Get as many as you have switches.
- **~3m Single Copper Wire (insulated):** Mine was 26AWG (wire diameter), which made it esay to work with.
- **2x Reset Switches:** Although you wont necearily need them since can map keybind to *reset* in your firmware I would still recommend it, since when still need it for some reasons later on it is easily accesible.
- **Brass Hot Melt Insert Nut:** These go into the case, wher you will screw the botthom plate into. The size of them depends on case screw whole size.
- **Screws:** Ones that fit into your *Brass Hot Melt Insert Nut*.

## Tools
- **Wire Stripper (recommended):** It will save you a ton of time by making the process of removing the insulation very easy.
- **Soldering Iron:** Absolute must have. If you can also get a pair of heat insert tips for your soldering iron for the heat inserts.
- **Multimeter (recommended):** Used to check if there is an connection between two points. Helpful in assisting you to find potential errors later on.


## Assembly Overview
There are plenty of build guides out there, some of the popular and good ones are:
- https://nickgreen.info/dactyl-manuform-build-log/
- https://blog.jfedor.org/2020/11/dactyl-manuform-build-log.html
- https://medium.com/swlh/complete-idiot-guide-for-building-a-dactyl-manuform-keyboard-53454845b065

They have wiring diagrams, part lists etc. with good explanation. With those things already in existence, I will layout the general steps and the potential difficulties rather then describe the whole process in meticulous steps.

### Installing the Switches
If you are not using Hot Swap, it is recommended to glue in the switches like so:

Otherwise if they are not sitting firm enough in the slot, there is a good chance, that when you change the Key caps latter on you rip the switch out with it and mess up your wiring. Hot glue is a solid choice for that.

### Wiring the Keyboard Matrix
Patience is key here because you will be spending a substantial amount of time with soldering.  It Probably took me somewhere between 10-15h cutting the wires, stripping, bending and realigning them.

The goal here is to create a matrix, consisting of wires (row) and diodes (columns) (as shown in the image below), because there are to many keys to wire each switch directly directly to a MCU pin.

But besides of running out of patience, pretty much the only thing you can mess up here is getting the diode direction wrong.

### Connecting to the MCU
Instead of soldering directly to the MCU, it is recommened to use a connector instead, such as these [DuPont connector](https://www.mattmillman.com/info/crimpconnectors/dupont-and-dupont-connectors/). In case of MCU failure, you can easily unplug the bad MCU instead of having to desolder it.

## Flashing 
Before installing the MCU it is best to flash the MCU first. If it does not flash, you most likey have a broken MCU and you can throw it away.

Mine is wired therfor it runs QMK. If you use Linux the setup process for QMK is very smooth if you are familiar with:

1. **Git**
2. **GitHub**
2. **Linux CLI**

In that case following the [QMK docs](https://docs.qmk.fm/newbs), to setup your environment, should not pose a major chanlange for you. Just do not forget to create the necesary udef rule, otherwise you will not be able to flash your device.

# Takeaway and thing I would do Different
The Dactyl Manuform is a very nice keybard to type on, do to the features pointed out in the beginning of this article. I also thing it is worth the hassle (the build took me around 20h) to go through if what you seek is a superior typing experience. But there are a few things I would do differently if I were to build another Dactyl Manuform: 

1. Rearranging the thumb cluster
2. Making the switches hot swappable by using such [single PCBs](https://github.com/JKing-B16/keyboard-pcbs/tree/master/amoeba-king).

All in all it is a solid keyboard especially if you take the time to adjust it to your ergonomic needs, because that is what the Dactyl Manuform truly lives off.
If you have any question or cretiqes feel free to use the comment section below.

**Stats you might find interesting:**
This Article was typed to:
- 40% on a *Svalboard*
- 30% on a *Dactyl Manuform*
- 20% on a *Zuoya GMK 67*
- 10% on a *Ferris Sweep*
