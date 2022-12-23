import shop from './shop'
import session from './session'
import pattern from './pattern'
import user from './user'
import coach from './coach'

export const jp = {
    login: 'ログイン',
    mail_address: 'メールアドレス',
    login_id: 'ログインID',
    password: 'パスワード',
    password_confirm: 'パスワード（再確認）',
    current_password: '現在のパスワード',
    new_password: '新しいパスワード',
    btn_send_mail: '送信する',
    btn_back_login: 'ログイン画面ヘ',
    btn_reset_password: 'パスワードを再設定する',
    btn_set_password: 'パスワードを設定する',
    show_password: 'パスワードを表示する',
    is_forgot_password: 'パスワードを忘れた方は',
    is_forgot_login_id: 'ログインIDを忘れた方は',
    is_here: 'こちら',
    format_password: '半角英数字記号8文字以上',
    send_mail_completed: 'メール通知が完了しました',
    noti_from_admin: '運営からのお知らせ',
    show_all_noti: '過去のお知らせはこちら',
    reset_account_completed:
        '「{0}」へログイン情報の通知メールを再送しました。',
    memo: 'メモ',
    items: {
        in: '件中',
        is_showing: '件目',
        showing: '表示中',
    },
    quantity_item_is_showing_table_header: '{0}-{1}件を表示中（全{2}件）',
    quantity_item_is_showing_table_footer: '{0}件中 {1}-{2}件目 表示中',
    prev: '＜ 前へ',
    next: '次へ ＞',
    btn_search: '検索',
    btn_clear: 'クリア',
    btn_create: '新規登録',
    table: {
        no_data: '該当のデータがありません。',
    },
    required: '※必須',
    status: {
        active: '有効',
        inactive: '無効',
        pending: '承認待ち',
    },
    create: '登録',
    back: '戻る',
    update: '編集',
    gender: {
        male: '男性',
        famale: '女性',
        no_select: '選択なし',
    },
    no_file_choose: '選択されていません',
    time_point: '時点',
    no_data: 'データなし',
    all: 'すべて',
    year: '年',
    change_password: {
        placeholder: {
            current_password: '現在のパスワード',
            new_password: '新しいパスワード',
            confirm_password: '新しいパスワード（再確認）',
        },
        label: {
            current_password: '現在のパスワード（半角英数字記号8文字以上）',
            new_password: 'パスワード（半角英数字記号8文字以上）',
        },
    },
    homepage: {
        sales: '売上管理',
        user: 'ユーザー一覧',
        shops: '店舗管理',
        reservation: '予約管理',
        account: 'アカウント管理',
    },
    shop,
    session,
    pattern,
    user,
    coach,
}
