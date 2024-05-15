import { typeText } from "@/util/narrative";

const primitives = {
    "C00.4": {
        id: "C00.4",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `Turning back around, you begin barking orders and motioning for the people to begin moving. They shuffle past you, some moving faster than others. You help navigate them through the chaotic city, a mess of first responders and fleeing civilians moving in all directions. You finally arrive before the forest, and send everyone scrambling into it's leafy cover. Bringing up the rear, you follow them in. Eventually everyone comes to a rest near a clearing in the forest, a small abandoned campsite. A fire is lit, and the people begin to settle in and lick their wounds.`,
            { component:"br" },
            `After a few hours, as the sun is setting, you hear a man's scream come from not too far in the distance, somewhere beyond the trees. You notice the people looking not to you, but to the rifle that rests in your lap.`,
        ]),
        choices: [ "C00.4.a", "C00.4.b" ],
    },
    "C00.6.a": {
        id: "C00.6.a",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `You remain still, standing on the trail.`,
        ]),
        choices: [ "C00.6.b", "C00.6.c", "C00.6.d" ],
    },
}

export const C00 = {
    "C00.1": {
        id: "C00.1",
        title: "Wake Up",
        prerequisites: [ "C00", ],
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [
            `You look at your surroundings, but a haze hangs over them like a veil. Muffled explosions ripple through the ground, someone is barking out orders in words that are both familiar and yet formless. Something about this place fills you with a feeling of guilt, of regret, of pain. You feel your head impulsively sink down into your shoulders. Before you, a being forms. You know it is there, and yet staring straight into it yields no answers. It is impossible to see, and yet you know it to be.`,
        ]),
        choices: [ "C00.1.a", "C00.1.b" ],
    },
    "C00.1.a": {
        id: "C00.1.a",
        title: "Who are you?",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `"Who are you?" you ask.`,
            { component:"br" },
            `"Does it matter? I am merely a guide." it replies calmly.`
        ]),
        nextNarrative: "C00.2",
    },
    "C00.1.b": {
        id: "C00.1.b",
        title: "What's all that noise?",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `"What's all that noise?" you ask.`,
            { component:"br" },
            `"Do you not remember?" it asks, condemning and dry.`
        ]),
        nextNarrative: "C00.2",
    },
    "C00.2": {
        id: "C00.2",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `"Where am I? Is this some sort of dream?"`,
            { component:"br" },
            `"Dreams are a peculiar thing, aren't they? So difficult to know when they've started or finished. And yet you can generally tell when they are, or are not." it explains, floating behind you.`,
            { component:"br" },
            `You turn your gaze to meet it when suddenly the world is clear, and the smell of ash and smoke hits your nose immediately. An unforgettable smell from the day of the invasion. Your recollections are interrupted as an older man in military fatigues rushes up to you and shoves a weapon into your hand.`,
            { component:"br" },
            `"Son, it's your chance to step up." He starts, with exasperated breath. "I need you to escort these folks as far from this place as possible, take them into the forest, keep everyone together, and for the love of god keep them away from anything inhuman."`,
            { component:"br" },
            `He gestures towards a group of soot-covered, rattled-looking men, women and children. Some walk with a limp, being supported by the younger ones. Others have obvious head trauma, hastily bandaged up, draped with a blankets over the shoulders. All of them need help, and they look towards you for it. The soldier, seeing your stunned look and confusion, pushes the gun further into your chest.`,
            { component:"br" },
            `"Come on, man, there's no time for this scaredy shit. What are you so afraid of?"`,
        ]),
        choices: [ "C00.2.a", "C00.2.b", "C00.2.c" ],
    },
    "C00.2.a": {
        id: "C00.2.a",
        title: "Nothing",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `"Nothing." you answer.`,
            { component:"br" },
            `"The world is ending, if you're not scared you're insane. Bravery without a little fear will get you killed."`
        ]),
        nextNarrative: "C00.3",
    },
    "C00.2.b": {
        id: "C00.2.b",
        title: "Getting caught",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `"Getting caught." you answer.`,
            { component:"br" },
            `"You're going to have to do it anyway. We're holding those monsters back, but you need to go, NOW."`
        ]),
        nextNarrative: "C00.3",
    },
    "C00.2.c": {
        id: "C00.2.c",
        title: "Hurting someone",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `"Hurting someone." you answer.`,
            { component:"br" },
            `"As long as you only point this weapon at the enemy you have nothing to worry about. You're going to have to try."`
        ]),
        nextNarrative: "C00.3",
    },
    "C00.3": {
        id: "C00.3",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `"Now go!" the man orders, before grabbing his own weapon and running off in the other direction, directly towards the smoke and rubble. You see the civilians' gaze follow him until he is out of sight, then they all turn back to you. The few of them that were sitting and resting have stood up, wincing through the pain. You turn, feeling your peripheral vision slipping away back into the same haze from before, but you shake it off.`,
            { component:"br" },
            `Where do you go?`,
        ]),
        choices: [
            { id: "C00.4.0", display: "North" },
            { id: "C00.4.1", display: "East" },
            { id: "C00.4.2", display: "South" },
            { id: "C00.4.3", display: "West" },
        ],
    },
    "C00.4.0": primitives["C00.4"],
    "C00.4.1": primitives["C00.4"],
    "C00.4.2": primitives["C00.4"],
    "C00.4.3": primitives["C00.4"],
    "C00.4.a": {
        id: "C00.4.a",
        title: "Throw the gun down",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `You throw the gun down and it clatters as echos with the gasps of the civilians. In the light of the fire, you see the silhouette of a woman who steps forward and picks the weapon off the ground. She stares at you for a brief moment with disapproving eyes before setting off into the dark, the weapon aimed but shaky in her hands.`,
            { component:"br" },
            `The haze begins to shroud your vision, ethereal curtains covering your eyes. No shaking your head can delay it this time. The last things you remember are the fearful looks on the faces of the people, and another scream, this time of a woman.`
        ]),
        nextNarrative: "C00.5",
    },
    "C00.4.b": {
        id: "C00.4.b",
        title: "Go investigate",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `Lifting the weapon up and pressing the butt into your armpit, you begin your slow march into the woods. The crackling of the fire gives way to a harrowing silence as you trail further away from the group. Your gaze ebbs and flows through the trees and though you don't know what you're looking for, you suddenly know you've found it. In the waning light of the evening, you see a body with a creature curled over it, it's head buried deep in the dead man's chest.`,
            { component:"br" },
            `The kick of the gun was much stronger than you were expecting. In the muzzle's flashes, you catch a couple glimpses of the creature's six eyes. Thick fur surrounds its neck and vitals, seeming to swallow up a bullet or two. Whatever shots hit did not do much to slow it down, however, as it lunges towards you, knocking the weapon out of your hands, and you close your eyes as it's sharp teeth come down upon you.`
        ]),
        nextNarrative: "C00.5",
    },
    "C00.5": {
        id: "C00.5",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `You stand with your eyes closed, the sounds around you fading out and giving way to a calming hum. Once again, a familiar presence hangs over you.`,
            { component:"br" },
            `"It is important to remember." it states.`,
            { component:"br" },
            `"I do," you reply, though the pieces are still a scramble in your mind. "That was day of the collapse. Lots of people died, went missing. But I don't remember what happened after."`,
            { component:"br" },
            `"Of course you don't. You've been here since."`,
        ]),
        choices: [ "C00.5.a", "C00.5.b", "C00.5.c" ],
    },
    "C00.5.a": {
        id: "C00.5.a",
        title: "Am I dead?",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `"Am I dead?" you ask.`,
            { component:"br" },
            `"Do you feel dead?"`,
            { component:"br" },
            `"I don't feel very alive. None of this feels real."`,
            { component:"br" },
            `"Your senses fall short explaining things they do not understand. You're here, aren't you? You are until you are not."`,
        ]),
        nextNarrative: "C00.6",
    },
    "C00.5.b": {
        id: "C00.5.b",
        title: "What attacked us?",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `"What attacked us?" you ask.`,
            { component:"br" },
            `"The same thing that attacks you now."`,
            { component:"br" },
            `"Which is what?"`,
            { component:"br" },
            `"Something poorly misunderstood. A scourge. Perhaps soon, it will be you."`,
        ]),
        nextNarrative: "C00.6",
    },
    "C00.5.c": {
        id: "C00.5.c",
        title: "How long has it been?",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `"How long has it been?" you ask.`,
            { component:"br" },
            `"I do not know."`,
            { component:"br" },
            `What? You seem to know everything else.`,
            { component:"br" },
            `"Some answers are harder to come by than others. Would you ask the eyeless man the color of the sky?."`,
        ]),
        nextNarrative: "C00.6",
    },
    "C00.6": {
        id: "C00.6",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [ 
            `You spend a few moments pondering over the words of the strange being. You can see it fading into something more tangible and material than before. It's still difficult to make out its shape, but you're finally able to perceive with some kind of sense.`,
            { component:"br" },
            `"Yeah, I don't know what any of that means."`,
            { component:"br" },
            `The figure remains silent and you feel its gaze sinking into you. `,
            { component:"br" },
            `"Your body is unconscious," it states. "Yet you are awake. See it as an opportunity. The exploration of the self is not a journey the body can make."`,
            { component:"br" },
            `Before you can answer, a ghastly hand reaches out and presses its palm against your forehead. You tip back, your body limp, but find yourself falling upwards into a field of dead grass with a faded beige colour. Before you is a trail that leads to a massive mound-like structure that stands in the distance. It appears to be spun of a fibrous webbing that is interlaced with veins of a black shimmering material. You feel it calling you though you hear no words. Something about the sky is wrong.`,
        ]),
        choices: [ "C00.6.b", "C00.6.c", "C00.6.d" ],
    },
    "C00.6.a.0": primitives["C00.6.a"],
    "C00.6.a.1": primitives["C00.6.a"],
    "C00.6.b": {
        id: "C00.6.b",
        title: "Examine Sky",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [
            `Looking into the sky above fills you with an uneasy feeling. It is empty, not a bird nor a cloud is seen, but your gaze is met by two suns, one rising in the west and one from the north. Despite the clear sky, it is a faded colour, and the harsh light of the suns makes you weary. It would be best to find cover before they are both fully risen.`,
        ]),
        nextNarrative: "C00.6.a.0",
    },
    "C00.6.c": {
        id: "C00.6.c",
        title: "Examine Ground",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [
            `You brush some of the grass aside, its dryness causing some of it to snap as you bend it. You jump back, startled by what you see below the cover. Countless little insects swarm across the ground, almost covering it completely, and you can only assume they are fully spread throughout the plain. You are forced to brush them off with your hand as they begin trying to curl up your leg.`,
        ]),
        nextNarrative: "C00.6.a.1",
    },
    "C00.6.d": {
        id: "C00.6.d",
        title: "Examine Structure",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [
            `You begin your walk towards the structure as twin shadows loom over you. A low fog rolls across the plain, refracting the light of the twin suns. An occasional breeze glides across the dead grasses, and the hiss covers an uncomfortable silence. Even the sound of your steps is dampened by the loose terrain of the path.`,
        ]),
        nextNarrative: "C00.7",
    },
    "C00.7": {
        id: "C00.7",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [
            `The entrance to the mound is a cavernous maw that sits open with a canopy of the black and white fibres that stick out at the top. Once inside, you notice it is much higher and wider than the view outside led you to believe, with pillars needed to support the immense ceiling. Their shadows lean towards you as they block the glow of the only light source in the building: a massive cocoon. It has petal-shaped layers that fold against each other and curl up the length of the cocoon, and it intermittently glows with a creamy pale colour. A hum comes from within it, ebbing and flowing with the glowing light inside, and you can still hear the whispers from before, significantly louder now. Bugs flow across the soft floor, gathering around the base of the cocoon, the light glistening off their carapaces as they move. A man's silhouette stands there, facing it.`,
        ]),
        choices: [ "C00.7.a", "C00.7.b", "C00.7.c" ],
    },
    "C00.7.a": {
        id: "C00.7.a",
        title: "Who are you?",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [
            `"Who are you?" you ask.`,
            { component:"br" },
            `"My name is Linus. A friend, who has walked your path before." He replies, without turning away from the cocoon.`,
            { component:"br" },
            `"And what path would that be?"`,
            { component:"br" },
            `"The path that has brought you here. It is different for each of us, but we all come to this place. I am here for you as others were here for me."`,
        ]),
        nextNarrative: "C00.end",
    },
    "C00.7.b": {
        id: "C00.7.b",
        title: "What's in the cocoon?",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [
            `"What's in the cocoon?" you ask.`,
            { component:"br" },
            `"The closest thing to alchemy I have witnessed. A process, poorly understood. Transformation."`,
            { component:"br" },
            `"What comes out of it?"`,
            { component:"br" },
            `"A being vastly different than that which went in. A twisted, vile thing."`,
        ]),
        nextNarrative: "C00.end",
    },
    "C00.7.c": {
        id: "C00.7.c",
        title: "...",
        content: ({ shouldTypeText }) => typeText(shouldTypeText, [
            `"It does render you speechless your first time seeing it, does it not?" The man asks, without taking his eyes off the cocoon. `,
        ]),
        nextNarrative: "C00.end",
    },
    
    "C00.end":{
        id: "C00.end",
        title: "End",
        content: <div>You have reached the end of the playable content.</div>,
    },
}