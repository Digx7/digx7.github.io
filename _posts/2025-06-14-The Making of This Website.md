---
title: "The Making of: This Website"
description: "How I made this website"
date: 2025-06-14
layout: post
image: "/assets/images/Thumbnail-Portfolio_Website.png"
draft: false
---

I've been meaning to make a website for a long time.  Indeed, since 2020 this website you are viewing is actually the 3rd iteration of this same idea.

To have a portfolio site where I can post any projects I work on, game, blog, or anything else.

The first iteration was a Wix site using their free resources to get something simple up and running.  The biggest problem I was running into was one of scale.  At the time the free Wix Site tools were best for single (or a handful of) static site pages that never change.  But I needed both a page for every project, and a page that lists all all projects.  Combine that with how hard getting a new page up was and I never got around to updating it.

But making a new iteration was always on the back of my mind.

Still my expertise is in Gamedev so as the years went on my knowledge in that area increased but my knowledge in WebDev never grew.  Sure I looked into it from time to time, but never looked for long or was even sure where to start.

One thing holding me back was the assumption that I'd have to pay for site hosting.

Even still the second iteration of this website really started in January of 2025 when I was finally done with college and looking for work (still looking btw).  I looked into frameworks that would be the easiest to do.  Part of me wanted to code the website myself rather than using a site builder, I did study Computer Science after all.  So on a whim I chose Ruby On Rails.

It seemed to allow an easy CRUD framework, had tons of documentation, and would shoe that I could code a website.  Regardless, despite tons of design work for each page (I had worked out the design for each page) the project fell to the back burner as I spent more time working on my games instead.

And even if I coded it I'd still have to pay for hosting.

Then about a month ago I stumbled onto GitHub Pages just by poking around on the site.  I was looking to make the Dev Diary blogs and looking for places I could post them.  In learning GitHub Pages I made a small site for my current game project D2.  So after a month of that I pulled the trigger and made a new portfolio site using GitHub Pages.

It had all the elements I was looking for.  It's free hosting, lets me code the site myself, is scalable (for the small size I need), and lets me add new pages easily.  It was perfect.

So what is it using under the hood?  GitHub Pages makes use of Jekyll, a static site generator, to take simple HTML and MarkDown files to make a website.  It lets you use as little as a single .md file to as much as custom html, css, and js files.  The entire site is hosted in a GitHub repo and whenever you push a new change it rebuilds the site using Jekyll's process through GitHub Actions (GitHubs automation framework).  All I need to do is push a new change and the website will be updated.

As for making the website itself, what your seeing took about 1 week of part time work.  Having the design from iteration 2 sped things up as I knew what I was working towards.  It started with the basic html for each page.  What took the most time was refining the css, js, and how exactly Jekyll links the pages.  

ChatGPT came in clutch giving me the starting templates for the css and all js files.  Css is something I don't know much about and through this I didn't have to spend hours poking through docs just to get the bare minimum up.  Even still I had to spend hours fine tuning some elements to get exactly what I wanted.

In particular the Carousels on the homepage took the most time as I wanted the Cards to all have the same size regardless of the underlying image sizes.  I still might tweak it further in the future.

There's always more to do, and more I could improve on.  At the time of writing many of the project pages need to be written or further fleshed out (I haven't touched some of these projects for years) I also could tweak the CSS to make the site more mobile friendly (some of the elements are really small on mobile even though it looks fine on desktop).  Lastly, I would like to one day add subcategories to my blogs and projects, though I'm putting that off to tell I have more of each.

For now I'm considering the site finished enough to be used.  I've already linked it on all my socials and plan on using it for all future job applications.

***

Visit the site here: [Link](https://digx7.github.io/index.html)