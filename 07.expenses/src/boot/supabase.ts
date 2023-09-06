//
// Loosely based on https://dev.to/tvogel/getting-started-with-supabase-and-quasar-v2-kdo
//
import { boot } from 'quasar/wrappers';
import { createClient } from '@supabase/supabase-js';
import { ref } from 'vue';
import type { Ref } from 'vue';

// declare module '@vue/runtime-core' {
//   interface ComponentCustomProperties {
//     $supabase: SupabaseClient<Database>;
//   }
// }

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

type Session = Awaited<
    ReturnType<typeof supabase.auth.getSession>
>['data']['session'];

const session: Ref<Session | undefined> = ref();
let setPasswordRequested: 'initial' | 'reset' | false = false;
let indexSupabaseHash = window.location.hash.indexOf('#access_token');
if (indexSupabaseHash < 0)
    indexSupabaseHash = window.location.hash.indexOf('#error');
const routerHash = window.location.hash.substring(
    0,
    indexSupabaseHash >= 0 ? indexSupabaseHash : undefined
);

const supabase = createClient(supabaseUrl, supabaseAnonKey);
supabase.auth.onAuthStateChange(async (_event: string, _session) => {
    session.value = _session;
    if (_event === 'PASSWORD_RECOVERY') setPasswordRequested = 'reset';

    const userMetaData = session.value?.user?.user_metadata;
    if (!userMetaData?.passwordSetup) {
        setPasswordRequested = 'initial';
    }
});


const init = async () => {
    const { error } = await supabase.auth.initialize();
    if (error) window.console.error(error.message);
    window.location.hash = routerHash;
}

export default boot(({ router }) => {
    router.beforeEach((to) => {
        if (setPasswordRequested) {
            to.query.setPassword = setPasswordRequested;
            setPasswordRequested = false;
            return to;
        }
    });
});

export { init, supabase, session };