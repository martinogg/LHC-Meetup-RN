import BuildSettings from '../src/Helpers/BuildSettings'

it('should return default fields', () => {

    expect(BuildSettings.get('FIREBASEapiKey')).toEqual('FIREBASEKEY');
    expect(BuildSettings.get('FIREBASEauthDomain')).toEqual('FIREBASEKEY');
    expect(BuildSettings.get('FIREBASEdatabaseURL')).toEqual('FIREBASEKEY');
    expect(BuildSettings.get('FIREBASEstorageBucket')).toEqual('FIREBASEKEY');

});