import alt from '../alt';

class FooterActions {
    constructor() {
        this.generateActions(
            'getTopCharactersSuccess',
            'getTopCharactersFail'
        );
    }

    getTopCharacters() {
        $.ajax({
            url: '/api/characters/top',
            cache: false
        }).done((data) => {
            this.actions.getTopCharactersSuccess(data);
        }).fail((jqXhr)=> {
            this.actions.getTopCharactersFail(jqXhr);
        });
    }
}

export default alt.createActions(FooterActions);