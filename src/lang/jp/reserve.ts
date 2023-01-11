export default {
    list_title: '予約管理',
    search_form: {
        status: {
            title: 'ステータス',
            value: {
                1: '予約中',
                2: '当日キャンセル',
                3: '予約取り消し',
                4: '実施',
            },
        },
        shop_id: {
            title: '店舗',
            placeholder: '店舗',
        },
        plan_id: {
            title: 'コース',
            placeholder: 'コース',
        },
        btn_expand: '検索条件を増やす',
        btn_hide: '検索条件を減らす',
        coach_id: {
            title: 'エナジスト検索',
            placeholder: '田中 康史',
        },
        order_created_at: '期間検索',
        day: '曜日',
        search: {
            title: 'キーワード検索',
            placeholder: '名前',
        },
    },
    columns: {
        date: '日時',
        shop_name: '店舗',
        plan_name: 'コース',
        coach_name: 'エナジスト',
        user_name: '名前',
        status: 'ステータス',
        edit: '編集',
        full_name: '名前',
        amount: '金額',
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
