---
title: "The Making of: Frost Loop (Game Jam)"
description: "How I made a game for the GMTK 2025 game jam"
date: 2025-08-02
layout: post
image: "/assets/images/Thumbnails/FrostLoop_GameJam.webp"
related_projects:
  - Frost Loop (Game Jam)
draft: false
---

FrostLoop was a Survival City-Building game with heavy FrostPunk and SnowPiercer inspirations that I built for the GMTK 2025 game jam.  This is how I built it.

--- 

# Pre Settup

Before the game jam started I setup my files

I used my custom Unity Template to set up a blank project and a Git Repo.

I've used this Unity Template for several projects before.  It gives me several managers and features I've used in every game.  

There were a few features I needed to add to this template.  These features had to do with how my scenes were being loaded and how my channels were talking to each other.

If you want my template you can find it linked below.  Be warned it's not super well documented.

With my project files ready to go all I had to do was wait.

# Getting the idea

I had work the day the jam started.  However, this gave me time to think on the theme and land on an idea.

The theme was: Loop

What goes in a loop?  Trains.  

Trains, that got me thinking about SnowPiercer.  I'd never seen a game based on it.  

But if I were to make one it could be a cool FrostPunk like city builder game with a limited scope.  Since you'd only be placing the train cars in a line it would limit the complexity I'd need to design.  Also the game could be 2D and allow me to stress test my workflow with the drawing tablet.

**Reference Images**
![Reference Images](https://digx7.github.io/assets/images/posts/TheMakingOf/FrostLoop_GameJam/ReferenceImageBoard.gif "alt text")

The game loop I landed on was this:
The player would manage a train of people trying to maximize some resources without those people rebelling.

The game would happen over a series of turns. 
Each turn the player could build, repair, or sell train cars on the train using the resources they had.  They could also assign workers to each built train car to generate more resources.  

Each turn the train would move to the next location on the world map.  As it moved, random events could happen.

With design in hand I could start development.  Even though the jam ran for 4 days I'd only have 2 days free to work.  So my plan was to spend day 1 getting the backend up and day 2 getting the frontend up.

# Day 1 The Backend

The Backend is all the systems that store and manage the players data for the game.

I spent about an hour ideating on my game idea and writing out all the systems I'd need to execute it.

**Systems Layout**
![Systems Layout](https://digx7.github.io/assets/images/posts/TheMakingOf/FrostLoop_GameJam/SystemsLayout.gif "alt text")

The main systems I got where:
- Resource Manager
- Map Manager
- Train Manager
- People Manager
- Event Manager

## Resource Manager
The first system I made.  This system kept track of the resources the player had.  Their current and maximum amounts, as well as how much they were generating and consuming each turn.  

The system needed to allow any other system to talk to it.  This is part of what took this project so long *making it so any system could talk to any other system*.

The resources I landed on where:
- Coal:  Powers the train, running out is game over
- Wood: Basic crafting resource
- Stone: Basic crafting resource
- Steel:  Advanced crafting resource, comes from Stone
- Lodging:  Needed to house people.  Homeless people are very unhappy and can lead to a quick game over
- Raw Food:  Needed to make Meals
- Meals:  Each worker consumes 1 per turn.  If someone doesn't each they get sick and unhappy and can lead to a gameover
- Discontent: Is raised when people are unhappy.  Its GameOver if this maxes out.
- Hope: Is raised when people are happy.  You win if this maxes out.

## Map Manager
The second system I built.  This one was responsible for holding all the data on each location.

This lead me to defining the following map spaces
- Blank: Nothing special happens here
- Event: 1 Random event out of a list is drawn
- Station:  You may spend lots of resources to unlock a train station.  If already unlocked you gain tons of resources.
- ~~Interchange: You may change up the order of your train cars here~~ *This space was cut for time*

Under the hood this system was a fancy list of Mapspace Classes.  There was a parent abstract Mapspace class and each of the types of spaces where unique classes that derived from this.

Again the main challenge with this class was getting it to talk to every other system.  Specifically to be able to broadcast the current space and its type.  Also I needed clean ways to recieve requests to update the current space in the list.

For awhile I was stumped by a bug where the Mapspace classes in the list were never updating.  This was because I was initializing a private variable, resulting in the function that was broadcasting the Mapspace to be broadcasting a unique object rather than a reference.

Finally fixing this bug made me feel incredibly smart and confused at the same time.  Never had initializing a variable cause a bug before.

## Train Manager
The third system I built.  This system keeps track of all the train cars you've built and the data about them.

Each train had a set amount of health, could be assigned some amount of workers or engineers *fancy workers*, and had some effect.

This led me to designing the following trains
- Engine: Takes no workers.  Consumes 1 Coal per turn
- Sleep:  Takes no workers.  It's existence adds 10 lodgings
- Farm:  Generates Raw Food based on number of workers
- Kitchen:  Turns Raw Food into Meals based on number of workers
- Scraper:  Generates Stone, some passively and some based on number of workers
- Factory:  Turns Stone into Steel based on number of workers
- Greenhouse:  Generates Wood based on number of workers
- Storage:  Increase maximum storage of resources 
- Prison:  Lowers Discontent
- Entertainment:  Raises Hope

Under the hood this system was a more complex version of my Map Manager.

It was a list of TrainCar classes.  But instead of broadcasting the active space, it needed to modify and broadcast data about any train car at any time.

Whenever another system requested to modify a train car, or there was an update to a train car, I included that train index in the List.

I worried this would cause problems when a train car was deleted, but because of how decoupled the systems were it was not a problem.

I also had to design this system in a way so that the exact effects could be iterated upon.  This meant each train had a list of systems to talk to weather when they were:  created, destroyed, or had workers added or removed.

For example:  The Farm car needed to increase Raw Food generation each time a worker was added.  It also needed to decrease Raw Food generation each time a worker was removed, or if the train car itself was destroyed.  

Keeping track of and scripting the train effects in such a way so that resources could not be infinitely generated, took a bit of time.


## People Manager
The fourth system I built.  This system was very similar to the Resource Manager in that it kept track of how many workers you had.

But unlike the resources, which could be generated or consumed, the People Manager tracked your total number of workers and the number of unemployed workers.

For example you could have 15 workers and 5 unemployed workers.  This means that the other 10 workers have been assigned to a certain train car.

Note that I was not actually tracking individual workers.  Instead I was just updating the totals when a worker was assigned or freed from a train car.

I had 2 types of workers
Worker: the default
Engineer: fancy workers

To avoid any further confusion from now on whenever I refer to workers I am talking specifically about the default type.  I will instead use the word People when I’m referring to both Workers and Engineers.

There was also a third type of person the Player Manager kept track of.  Sick People.

For simplicity's sake I made it so the number of sick people is exactly equal to the difference of total people *workers + engineers* and Lodgings *See the Resource Manager*.  

Sick people also generate discontent.

They are cleared by making more Lodgings than total people.

Taking what I had learned from the Resource Manager, this system was actually really easy to throw together.

## Event Manager
The Last system I built.  This system processed the random events that could happen.

It does not generate the events, but instead handles their consequences.

This system has a queue of Events that can be added to by any system.  Said systems provide the exact event to enqueue.  

Then at the start of each turn this system iterates through all the events in its queue showing them, waiting for the user's input, then processing that result.  It does this until there are no events left in its queue.

These events are shown at the start of the turn before the player can do anything else.

The Map Manger ended up being the system that enqueued Events the most often.  Particularly the Event Spaces and the Station Spaces.

The Event Space would queue up a random event from its own list.  The Station Spaces had two events they could show.  One was the event to pay to unlock the station.  If the Station Space was already unlocked it would enqueue the second event, where you collected the resources at said station.

Under the hood the Events themselves where ScripableObjects with custom classes for the options.  The classes for the options included child classes for each type of option *what system it would call and with what data*.  I even had to make variations that would first check a given system for some amount before calling a second system.

An example would be an option that gives you +2 Engineers if you have 5 Wood.

The hardest part of this system was getting the option classes working in a way where I could easily iterate on them.  However, once I got them to where they are now I could easily create hundreds of Events if I wanted.  I believe for the game jam I kept it to around 20.

A surprise win of this system is that it allowed me to use it to cover some unexpected UI cases.  These include, how to handle Station Spaces, Game Overs, Win states.

## Other Systems.
There were a few other smaller systems I had to make.

Turn Manager.  This system just handled the order of what other systems to call when the player ends their turn.  When the turn ends resources are generated or consumed, trains may take damage *and therefore be destroyed*, the Game Manager needs to check if the game is over.  The Map Manager needs to move to the next space, and any queued events need to be displayed.

Game Manager.  Just check if the game is over.  Based on the end state it queues a given event.

**End Of Day 1**
![End Of Day 1](https://digx7.github.io/assets/images/posts/TheMakingOf/FrostLoop_GameJam/Day1Game.gif "alt text")

# Day 2 The Frontend

Day 2 was spent working on the Frontend.  This included Artwork, UI, polishing, and various bug fixes.  This was also my last day and the day I released the game.

## Artwork
One of my goals going into this Game Jam was the desire to stress test my Pen Tablet and my digital art skills.

I had recently picked up the XP Pen Deco 640 drawing tablet and had been using it with the free drawing software Krita.

Because this digital art workflow is closer to how I do traditional pen drawings it felt so much more rewarding than doing pixel art.

Nothing against pixel art, this is just a personal preference on my part.

Over the course of this game I got to use this workflow to make:
- The trains
- The backgrounds
- The particles
- The UI Icons

### The Trains
I originally had plans to make unique train sprites for each train.  However, to save time for the game jam I kept to these very simple designs

Show trains

I would go on to make the train sprites the following week as some followup work.  See my post on The Making of FrostPunk Trains

### The backgrounds
These would be tiled elements in the background and foreground.  

At first I tried making them detailed but found I got better results if they were one color.  This made them not draw attention from the Train.  I also found that by making them all white I could adjust their color in the Unity Editor.

These were also made on a single spritesheet.

### The particles
I easily made these in Krita.  I made a bunch but ended up only using 1.

**Day 2 Vibes**
![Day 2 Vibes](https://digx7.github.io/assets/images/posts/TheMakingOf/FrostLoop_GameJam/Day2Vibes.gif "alt text")

### The UI Icons
Like the background these were all made on a single spritesheet.

For simplicity I made them all white.  Well I had fun making these. I found out that the linework on these needs to be very precise for the effect I was going for.  More precise than I could realistically do.

## UI
Making the UI Huds and Menus took the most time of anything I worked on this day.

When I was making the Backend I built those systems in such a way that any system could talk to any other system.  They were not tightly coupled to each other.  They also did not care where their inputs came from.

This allowed me to make it so the UI basically interacts with the Backend via API calls.  It’s not literally an API, and it's not going over the web.  But it has the same effect.  I could completely replace all the UI and not have to touch the BackEnd at all.

That said each UI Hud or Menu still took on average around 2 hours a piece.

This is because each UI Widget *Hud or Menu* includes both visually designing it *laying out the components*, and code to get it talking to the correct systems.

Let me give you an example of a simple system.  The Resource Bar at the top of the screen.  This shows all the resources, how many the player has, and how many they will consume or generate each turn.  This Widget needs to be listening to the Resource Manager for anytime that a given resource is updated.  Once a resource is updated this Widget will update itself accordingly.  

Another example is the menu for buying new trains.  Once the player selects which train to buy the Widget will query *ask* the Resource Manager if it has enough resources.  If so it tells the Resource Manager to deduct those resources, and tells the Train Manager to add that new Train.
Just a reminder NONE of the logic of these Backend systems existed in these UI Widgets.  Honestly this is probably good dev practice in general.

What took the longest *and was the cause of the most bugs* was making sure that each button on any UI widget talked to the correct systems in the correct order.

**Day 2 UI**
![Day 2 UI](https://digx7.github.io/assets/images/posts/TheMakingOf/FrostLoop_GameJam/Day2UI.gif "alt text")

## Polishing and bug fixes
Near the end with all the systems and front end online I began to test the game for polish and bugs.

The polish mostly included balancing out the exact numbers to make the game possible to beat but also fun.  An early balance issue I found was that it was really hard to gain any new workers, and that without a steady supply of new workers it was really hard to grow your train.

In the end I realized I could have spent hours balancing the numbers, tweaking the exact order of map spaces, and adjusting the events to maximize the fun and challenge.  But because it was a game jam and I was short on time I balanced everything to be super favorable towards the player.

Part of my thinking was that as the developer I knew all the optimal decisions and build order.  But most new players wouldn’t know.  So they would need some breathing room.

Most of the bugs came from edge case in the UI where I either forgot to include a call to some system, or accidentally had a Widget listening to the wrong system.  

Release
Near the end I threw together a Thumbnail in Krita, grabbed some screenshots, made a web build and set it to be released.

I was really cutting down to the wire.  Even though I released 5 hours before the deadline, it was about 30 mins before I would need to be leaving due to a personal event.

# Post *Wins and Losses*
Personally, this game jam was a big win for me.  This feels like the closest I’ve had to a game that matches the vision I set out with.

I made nearly exactly the game I intended to make.

Now the scores I got from the game jam rates weren’t great.  My average raw score was around 2.39 out of 5.  What really got me was the lack of any audio, clear tutorials, and a bug where you had to refresh the webpage to restart properly.  

But the comments on the game were super positive with many loving the narrative and claiming they’d enjoy the game if it was polished/fleshed out a bit more.  

Overall a win.

Going forward I spent an extra week improving the art.  You can read about that in my post The Making of FrostPunk Trains.  

At the time of writing I’m still deciding on whether I want to keep working on this project.  So keep an eye out for that.
