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
        status: '有効/無効',
        edit: '編集',
        invited: {
            created_at: '日時',
            full_name: '店舗',
        },
        sessions: {
            date: '日時',
            shop_name: '店舗',
            plan_name: 'コース',
            full_name: 'コース',
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
        },
        value: {
            is_active: {
                active: '有効',
                inactive: '無効',
            },
        },
    },
}
