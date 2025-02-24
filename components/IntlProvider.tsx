/* eslint-disable @typescript-eslint/no-explicit-any */
import { IntlProvider } from 'next-intl';

type IntlProviderProps = {
    pageProps: {
        messages: Record<string, string>;
        now: string;
        locale: string;
    };
     children: any;
}

export default function IntlProviderFunction({ pageProps, children }: IntlProviderProps) {
    return (
        <IntlProvider
            messages={pageProps.messages}
            now={new Date(pageProps.now)}
            timeZone="Austria/Vienna"
            locale={pageProps.locale}
        >
            {children}
        </IntlProvider>
    );
}