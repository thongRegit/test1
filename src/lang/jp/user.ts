export default {
    status: 'ステータス',
    keyword_search: 'キーワード検索',
    first_experience: '初回体験',
    ruleForm: {
        status: {
            title: 'ステータス',
            value: {
                all: '全て',
                0: '無効',
                1: '有効',
            },
        },
        name: {
            title: 'キーワード検索',
            placeholder: '名前、メールアドレス、電話番号',
        },
    },
    columns: {
        full_name: '名前',
        tel: '電話番号',
        created_at: '登録日',
        first_experience_date: '初回体験日',
        last_session_date: '最終セッション日',
        is_active: '有効/無効',
        edit: '編集',
        sessions: {
            date: '日時',
            shop_name: '店舗',
            plan_name: 'コース',
            coach_name: 'エナジスト',
            status: 'ステータス',
        },
        cancel_fees: {
            date: '日時',
            shop_name: '店舗',
            plan_name: 'コース',
            amount: '料金',
            cancelling_pay_status: 'ステータス',
        },
    },
    tabs: {
        1: '基本設定',
        2: 'セッション',
        3: 'キャンセル料',
    },
    detail: {
        label: {
            name: 'お名前',
            name_furigana: 'お名前（ふりがな）',
            birthday: '生年月日',
            tel: '電話番号',
            line_name: 'LINE名',
            gender: '性別',
            status: 'ステータス',
            is_active: '有効/無効',
            first_name: '性',
            last_name: '名',
            first_name_furigana: '性（ふりがな）',
            last_name_furigana: '名（ふりがな）',
        },
        value: {
            status: {
                1: '一般',
                2: '初回体験',
                3: 'サブスクリプション',
            },
            is_active: {
                active: '有効',
                inactive: '無効',
            },
        },
    },
}
