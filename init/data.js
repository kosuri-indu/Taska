const { trusted } = require("mongoose");

const sampleBoxes = [
    {
        "title": "Diet",
        "elements": [
            { "name": "1 spoon Honey", "checked": false },
            { "name": "3 Dates", "checked": false },
            { "name": "2 Bananas", "checked": false },
            { "name": "1 Apple", "checked": false },
            { "name": "1 cup Almonds", "checked": false },
            { "name": "1 cup Greek Yogurt", "checked": false }
        ]
    },
    {
        "title": "Exercise Routine",
        "elements": [
            { "name": "Morning Run", "checked": true },
            { "name": "Push-ups", "checked": false },
            { "name": "Squats", "checked": false },
            { "name": "Planks", "checked": false },
            { "name": "Bicycle Crunches", "checked": false },
            { "name": "Jumping Jacks", "checked": false },
            { "name": "Yoga", "checked": true }
        ]
    },
    {
        "title": "Tech",
        "elements": [
            { "name": "Web Dev", "checked": true },
            { "name": "DSA", "checked": false },
            { "name": "ML", "checked": false },
            { "name": "Java", "checked": true },
            { "name": "Python", "checked": true }
        ]
    },
    {
        "title": "To Read",
        "elements": [
            { "name": "The Alchemist", "checked": false },
            { "name": "Sapiens", "checked": false },
            { "name": "Atomic Habits", "checked": false }
        ]
    },
    {
        "title": "To Watch",
        "elements": [
            { "name": "Breaking Bad", "checked": false },
            { "name": "The Office", "checked": false },
            { "name": "Stranger Things", "checked": true },
            { "name": "Game of Thrones", "checked": true },
            { "name": "The Crown", "checked": false },
            { "name": "The Mandalorian", "checked": false },
            { "name": "Black Mirror", "checked": false }
        ]
    },
    {
        "title": "Music",
        "elements": [
            { "name": "Classical Music", "checked": false },
            { "name": "Jazz", "checked": false },
            { "name": "Podcasts", "checked": true },
            { "name": "Rock", "checked": false }
        ]
    }
];

module.exports = { data: sampleBoxes };
