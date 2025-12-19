---
title: "Tools Unlocked | Frost Loop | Devlog 6"
description: "Tools to help be Dev!"
date: 2025-12-19
layout: post
image: "/assets/images/Thumbnails/FrostLoop_Devlog_6_Thumbnail.webp"
draft: false
---

[Want](https://youtu.be/SqABLGdmv20) to watch this instead?
[Wishlist](https://store.steampowered.com/app/3967750/Frost_Loop) FrostLoop here

## Intro
Merry Christmas and Happy holidays!
Here’s what I’ve been working on for the past few weeks in no particular order.

## CSV Pipeline
It was getting tedious to manually edit the data for each train, and impossible to compare them for balance purposes.  So I developed a tool that can import and export their data to and from a .csv spreadsheet.

.csv or comma separated values stores this, as this (csv code).  Each line is one entry and all values are separated by a comma, simple.  But, what if a single value has multiple lines?  The intended solution is to wrap those values with double quotes.  Therefore any code that reads .csv files needs to ignore data inside a double quote when separating rows.  Use these line breaks, but not these.  Easy for a human to spot, tricky for code to spot.

Most languages have libraries or packages to handle this exact problem, C# is no different with CSVHelper.  However, I could not figure out how to install this into Unity as doing so requires terminal shenanigans that elude me.  In theory it's just a single command.  In practice something in my own Unity project folder isn’t set up in the standard way so this command is failing.  What exactly is causing it to fail? 
I don’t know, nor have I been able to figure it out.

So instead I rolled out my own .csv parser.  I changed the commas to pipes and added dollar signs to indicate the end of each row.  Now my parser just looks for a dollar sign followed by a line break to indicate the end of a row.

Hey, if it's stupid but it works, it's not stupid.

Now I can edit and balance all the data for my trains from a single spreadsheet.


## Speed Controls
Now the speed options change depending on what engine you’ve built, if any. Also the backgrounds now match your speed and the map shows a preview of where you will move.

An engine's speed options are stored with the data letting me use my new CSV script to edit them.


## Others 
I was able to use my CSV pipeline to automatically tag certain keywords so in game they appear a different color or can have an icon appear next to them.

I might even one day have them link to the in game Guide pages that I have now implemented.  These are still a work in progress but at the moment I have around 100 pages.  Because there is a page for every train, resource, and station in the game (more on those later).

## Demands
Now, for the longest time the player never really had clear objectives to work towards.  The main objective is to max out this Hope bar.  But the way they are supposed to increase that is by completing various objectives or demands that their citizens will have.  So I finally started implementing those.  At the moment I think the demands will include a variety of resources that the player must make within a set number of turns.  For example, make 100 rations within 25 turns.  As the game proceeds the amount of resources and number of demands will increase.  So the player will start the game with 1 demand but by the end might have a dozen at once.

## Stations
For example I want stations to have their own demands.  Stations are another big feature I’ve begun working on.  At set locations on the map the player can build a station and assign workers to them.  Stations will produce resources just like train cars, but at a larger amount with the trade off of taking several turns.  For example the Forestry Station can produce 200 wood every 10 turns.  The catch is that the player must be at the station to pick up the resources.

In the future I want these stations to have their own demands the player must complete or risk the station falling apart.

Demands and Stations are something I’m still very much working on but will be a core part of the game.

## CICD Script
I’ve been dreading the process of getting a build of my game uploaded onto steam.  I was under the impression that it would be a very tedious and complicated process.  It was not.

It could be.

But thanks to a tutorial I found that I’ll link below it was incredibly easy [Tutorial](https://www.youtube.com/watch?v=gwMPvEFFomE).

To be clear I’m just talking about getting a build of my game onto steam, not releasing it or going though certification. 

To even get it on steam I thought I would need my game connected to the steamworks api, which is written in c++ but unity is in c#.  So I thought I would need to wrangle some third party plugin just to upload my game.  Turns out I don’t.  Well I will still need to do that if I want to implement Steam achievements or cloud saves, which I do, but that’s a future me problem.  

So now even though the game is not public I can play it from my own steam library, which feels awesome.

After figuring out how to upload builds to steam I began automating the process.  I put together a terminal script that can make builds from unity and upload them to steam.

Could I do this process manually?  Yes.  It only takes a few minutes.  But it's nice to be able to just push a button and have a new build on steam.  Especially once my game is live, having this in place will let me get patches out faster.

Having this script in place lets me expand upon it in the future if I start having to manage multiple builds of my game at once.

This got me thinking about the potential worst case scenario.  As a game dev how many different builds could I have to manage at once?
2,3,5.. Try 20+.

How in the world did I come up with that number?
Well let's think through what separates builds.  First you have the full game, and maybe a demo.  But what if you also want to release on Windows, Mac, and Linux.  Each of those needs a demo as well.  If you’re releasing your game on Steam and including steam achievements and cloud saves your builds need to connect to Steam’s API.  That means if you also release any other pc platforms like Epic, itch, or the Windows Store those builds need to be separate, and even unique if those platforms have their own APIs.  This is starting to add up.  And you could still have web builds, mobile builds, and console builds.  Any one of these builds could have its own dev build for testing, or a unique showcase version used just for in person conventions, and we haven’t even added localization into the mix.

Obviously this is an excessive example and I can’t really think of any game that actually does this.  But if I have one script that can automatically make and deploy one or all of these builds at once, that will be a huge benefit to me in the future.  Not just for this game but for any game I make.

In fact I’m already getting some good use out of this script.



## Playtesting and Showcasing
Recently I’ve gotten the chance to show off my game at a few local indie developer meetups.  Through these events I was able to get invaluable feedback and playtesting data on my game.  The biggest feedback I’ve been getting is that the tutorial and opening few minutes needs some reworking.  Many playtesters were confused on the big picture goal they were aiming for, and stumped on how a few systems worked.  However, the few playtesters who did figure these things out went on to play for an average of 30-40 minutes with some even completing most of the content I’ve implemented in around an hour or so.  Encouraging, but clearly there's more work I need to do.

## Outro
That’s all for this devlog, thanks for reading and have a wonderful day!