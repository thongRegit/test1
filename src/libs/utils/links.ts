export const SIDE_MENU_ADMIN: {
    [key: string]: {
        index: string
        label: string
        route: string
        class: string
        menu_childs: any
    }
} = {
    shops: {
        index: '1',
        label: 'homepage.shops',
        route: '/shops',
        class: '',
        menu_childs: [],
    },
    sessions: {
        index: '2',
        label: 'homepage.sessions',
        route: '/session',
        class: '',
        menu_childs: [],
    },
    users: {
        index: '4',
        label: 'homepage.users',
        route: '/users',
        class: '',
        menu_childs: [],
    },
    coaches: {
        index: '5',
        label: 'homepage.coaches',
        route: '/coaches',
        class: '',
        menu_childs: [],
    },
    reserves: {
        index: '6',
        label: 'homepage.reserves',
        route: '/reserves',
        class: '',
        menu_childs: [],
    },
    plans: {
        index: '7',
        label: 'homepage.plans',
        route: '/plans',
        class: '',
        menu_childs: [],
    },
    patterns: {
        index: '8',
        label: 'homepage.patterns',
        route: '/patterns',
        class: '',
        menu_childs: [],
    },
}
