import 'styled-components';

declare module 'styled-components'{
    export interface DefaultTheme {
        textColor: string;
        backgroundColor: string;
        accentColor: string;
        highlightColor: string;
        hoverColor: string;
    }
}