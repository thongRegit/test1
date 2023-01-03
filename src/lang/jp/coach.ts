export default {
    list_title: 'ENERGIST一覧',
    status: 'ステータス',
    keyword_search: 'キーワード検索',
    first_experience: '初回体験',
    ruleForm: {
        status: {
            title: 'ステータス',
            value: {
                all: '全て',
                1: '有効',
                0: '無効',
            },
        },
        search: {
            title: 'キーワード検索',
            placeholder: '名前、電話番号',
        },
    },
    columns: {
        full_name: '名前',
        nickname: 'ニックネーム',
        tel: '電話番号',
        created_at: '登録日',
        is_active: '有効/無効',
        edit: '編集',
        invited: {
            created_at: '日時',
            full_name: '名前',
        },
        sessions: {
            date: '日時',
            shop_name: '店舗',
            plan_name: 'コース',
            full_name: '名前',
            order_status: 'ステータス',
        },
    },
    tabs: {
        1: '基本設定',
        2: '紹介者登録状況',
        3: 'セッション',
    },
    detail: {
        label: {
            name: 'お名前',
            name_furigana: 'お名前（ふりがな）',
            birthday: '生年月日',
            tel: '電話番号',
            invite: 'LINE名',
            is_active: '有効/無効',
            invitation_code: '紹介用URL',
            people_invited: '今月の紹介実績',
            first_name: '性',
            last_name: '名',
            first_name_furigana: '性（ふりがな）',
            last_name_furigana: '名（ふりがな）',
            nickname: 'ニックネーム',
        },
        value: {
            is_active: {
                active: '有効',
                inactive: '無効',
            },
        },
    },
}
