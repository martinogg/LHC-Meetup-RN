const jsonkey = {
    LHC: {
        FIREBASEapiKey: "FIREBASEKEY",
        FIREBASEauthDomain: "FIREBASEKEY",
        FIREBASEdatabaseURL: "FIREBASEKEY",
        FIREBASEstorageBucket: "FIREBASEKEY",
        FIREBASEprojectId: "FIREBASEKEY"
    }
};

const build = 'LHC';

class BuildSettings {
    
    public static get(value: string): any {
        const app = jsonkey[build]
        return app[value]
    }

}

export default BuildSettings;