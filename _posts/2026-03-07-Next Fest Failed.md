---
title: "Next Fest Failed...? | Frost Loop | Devlog 7"
description: "My game participated in NextFest!"
date: 2026-03-07
layout: post
image: "/assets/images/Thumbnails/FrostLoop_Devlog_7_Thumbnail.webp"
related_projects:
  - Frost Loop (Steam Game)
draft: false
---

Want to [watch](https://youtu.be/jV2meT3DFLM) this instead?
[Wishlist FrostLoop](https://store.steampowered.com/app/3967750/Frost_Loop)

## Intro
Hello I’m Digx7 and this is Devlog 7 of my first steam game Frost Loop a Survival City Builder on Rails

## Composer
Near the start of January I signed on a Music Composer: [Guillaume Fabre](https://guillaumefabre.com).  We had been talking back and forth for a bit and I loved the demo they sent me.  Initially I was planning on working on the project completely solo, but since my main objective is to use this project to boost my portfolio I figured being able to add ‘contracting a composer’ to my resume would be a huge plus.
So once I made this decision I spent a bit of time researching contracts. I wanted to do this fairly and properly.  During my research I came across a great series of GDC talks on legal contracts for game developers, I’ll link it in the description below.  (NOT LEGAL ADVICE)
I won’t go into details on any of the terms we settled on but I’m very happy with the arrangement and the work that Faber has produced since.
I’ll link his details in the description if you happen to be looking for a composer as well.

## FMOD
As part of bringing on a composer we wanted to create dynamic music that changed as the game changed.  To achieve this we decided to add FMOD to the project.
FMOD, whose logo you’ve likely seen at the start of many games, is an audio tool that lets you edit audio clips in real time, for example: music that changes right when the boss enters its second phase.
Initially I was worried that adding FMOD into my existing project would take a ton of work, but it actually only took a day at most.  The process was really smooth thanks to FMOD’s own documentation on how to integrate with Unity.  
The main challenge comes in converting all Unity’s Audio Components and Audio Clips to FMODs Emitters and Events.  Depending on how you were handling these previously is what will determine how easy or hard this conversion is.  Also pay special attention to your version control process as FMOD has a few files it really doesn’t want you to save in Version Control.

Now granted, I'm a solo developer with a strong programming background, so your mileage may vary on how easy it is for you to add FMOD to your project.  But within a day FMOD was integrated into Unity and within a week of signing the composer Faber had access to and was working in their own branch in the code base.

## Next Fest
Moving on toward the end of February my game participated in the 2026 February Steam Next Fest.  As part of prepping for that I had to refine my game and make a demo build.  I started by locking parts of the research tree out of the Demo.  Next I overhauled the layout of the research tree as well as reworked the initial tutorial objectives.  Both of these were done in an effort to improve the player onboarding experience as both were elements that tripped up players the most in previous playtesting.

The last thing I did was add a scenario selection button to the new game menu.  This does not do anything right now but in the full game I plan on adding multiple scenarios that the player can play through, this is just my way of hinting at that in the demo.

Once nextfest itself kicked off it was kind of surreal.  Looking at the steam analytics I got around 100+ people to play my game.  Not alot but I also went in with basically zero marketing.  The strangest part was getting almost no feedback.  I initially didn’t create a discord server, nor did the demo have its own steam page (so users couldn’t leave reviews).  This means that outside of seeing the analytics numbers go up I have no evidence that anyone played it at all.  No feedback on what they liked or didn’t like.  Going from in person playtests to this feels really strange.

Part of that is on me for not providing traditional avenues for feedback.  Part of that is the lack of any audience around my game.  In the future I’ll have both a separate demo page and a discord setup going into NextFest.  

I also realized halfway through Nextfest that the public demo build was a much older build than I expected.  I had been using my automated build pipeline for so long that I forgot that Steam requires you to manually approve public builds before they can go live.
So many learning experiences all around.

But regardless of the outcomes I have only about 1 month left on this project before its release on March 27th.  So it’s time to add the last few features, really polish what I have and get everything ready for release.

## Outro
That’s all for this post next will likely be either right before or right after the games release.  So I’ll see you all then.  Thanks for reading.
