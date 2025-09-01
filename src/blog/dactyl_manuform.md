---
title: The Dactyl Manuform Keyboard
author: Xyroton

description: "A DIY ortholinear split keyboard with a keywell."
image:
  url: "/posts/"
  alt: ""
pubDate: 2025-05-30
updatedDate: 
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

DM mention

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
The popular choice these days is the Cosmos Keyboard Generator, which in comparison to other configurators is relatively easy to use since you use it through the official website with its nice GUI to modify things, and you do not have to manually set up a local build environment. It also has good documentation about how to use the configurator and build your own Dactyl-Manuform.
Another decent option, which is the one I chose, is one of locally based Python Generators such as this one. If you are not coming from the programing world these can be cumbersome for you to use for various reasons.
The reason for me not to use Cosmos back then was, that the python based Generator had better/edge design/placement which looked visually more pleasing.
But Cosmos has come a long way since then and is probably the better choice now.

### Printing
Since the Dactyl-Manuform is meant to be configured to ones personal needs, one will need to 3D print the case. It is best of course to own a capable 3D printer, to potentially play around with different designs. I can highly recommend the BambuLab A1, that is what I personaly use. Else you can also use a 3D online printing service such as JLC, though I have no personal experience with them. 

## Putting it Together
There are plenty of build guides out there, some of the popular and good ones are:
- https://nickgreen.info/dactyl-manuform-build-log/
- https://blog.jfedor.org/2020/11/dactyl-manuform-build-log.html
- https://medium.com/swlh/complete-idiot-guide-for-building-a-dactyl-manuform-keyboard-53454845b065

They have wiring diagrams, part lists etc. with good explanation. With those things already existing I will not bother going into detail and rather explain the general steps to what to expect.

### General Parts list
- **1x right case/1x left case:** Most cases are printed in PLA as is mine, some fancier ones are printed in Resin or even Nylon.
- **2x MCU holders:** Different Cases need differnt designs, and often differnt MCUs need also slighly differnt designs.
- **?x Switches:** The ammount of switches you need depends on formfactor of Dactyl Manuform case that you picked, for me it was 80 switches. Usually you would want MX style switches, although if your case supports it other switches are possible such as Kailh Choc.
- **?x Keycaps:** Same ammount as switches. Usually you would want them with the SA profile for the Dactyl Manuform to complement the keywell.
- **2x MCUs:** Dedide if you want wired or wireless.
- **2x TRS Jacks (wired version):** You can also use TRRS but then you have to make sure you solder to the same contacts on each side.
- **?x Diodes:** Get  as many as you have switches.
- **~3m Single Copper Wire (insulated):** Mine was 26AWG (wire diameter), which made it esay to work with.
- **2x Batteries (wireless vesion):** Mine is wired therefor I have nothing to share.
- **2x Reset Switches:** Although you wont necearily need them since can map keybind to *reset* in your firmware I would still recommend it, since when still need it for some reasons later on it is easily accesible.
- **Brass Hot Melt Insert Nut:** These go into the case, wher you will screw the botthom plate into. The size of them depends on case screw whole size.
- **Screws:** Ones that fit into your *Brass Hot Melt Insert Nut*.

### Tools
- **Wire Stripper (recommendet):** It will save you a ton of time by making the process of removing the insulation very easy.
- **Soldering Iron:** Absolut must have. If you can also get a pair of heat insert tips for your soldering iron for the heat inserts.
- **Multimeter (recommendet):** Used to check if there is an connection between two points. Helpful in assiting you to find potentiall errors later on.
