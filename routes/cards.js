const express = require('express');
const router = express.Router();
const { data }  = require('../data/flashCardData.json');
const { cards }  = data;

router.get('/:id', (req, res) => {
    const { side } = req.query;
    const { id } = req.params;
    if( !side ) {
        res.redirect(`/cards/${id}?side=question`);
    }
    const text = cards[id][side];
    const { hint } = cards[id];
    const templateData = { id, text, name};

    if (side === "question") {
        templateData.hint = hint;
        templateData.sideToShow = "answer";
        templateData.sideToShowDisplay = "Answer";
    } else if (side === "answer") {
        templateData.sideToShow = "question";
        templateData.sideToShowDisplay = "Question";
    }
    
    res.render('card', templateData );
});

router.get('/', (req, res) => {
    const cardsNum = cards.length;
    const id = Math.floor(Math.random() * cardsNum);
    res.redirect(`/cards/${id}`);
});

module.exports = router;