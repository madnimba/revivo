function selectButton(buttonId) {
    const buttons = document.querySelectorAll('.selectable-button');
    
    buttons.forEach(button => {
        if (button.id === buttonId) {
            button.classList.add('selected-button');
        } else {
            button.classList.remove('selected-button');
        }
    });
}