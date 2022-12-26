export default {
    required: '{0}は必須です。',
    mail: 'メールアドレスの書式のみ有効です',
    min: '{0}は{1}以上のみ有効です。',
    max: '{0}は{1}以下のみ有効です',
    password: {
        format: 'パスワードは半角英数字記号8文字以上入力してください。',
        confirm: 'パスワードとパスワード（再確認）が一致しません。',
        format_with_label: '{0}は半角英数字記号8文字以上入力してください。',
    },
    login_id: {
        format: 'ログインIDは半角英数字8文字以上入力してください。',
        already_exist: 'このログインIDは既に登録されています',
    },
    zip_code: '郵便番号が存在しません。',
    numeric: '{0}は数字のみ有効です',
    size: {
        numeric: '{0}は{1}桁のみ有効です',
        file: '{0}は{1}KBのみ有効です',
        string: '{0}は{1}文字のみ有効です',
        array: '{0}は{1}個のみ有効です',
    },
    image: {
        type: '画像は「jpg」「png」「jpeg」のみ有効です',
        max: '{0}は{1}MB以下のファイルのみ有効です',
    },

    cancel_fail: '取り消し失敗しました。',
    tel_format: '電話番号は英数字とハイフンのみ入力してください。',
    age: '{1}歳未満の方はご登録いただけません。',
    change_password: {
        required: '{0}は必須です。',
        confrim_password_required: '確認のパスワードを入力してください。',
        format: '{0}は半角英数字記号を含めて入力してください。',
        min: '{0}は{1}桁以上入力してください。',
        max: '{0}は{1}文字以下入力してください。',
        confrim_password_diffirent: '新しいパスワードと一致しません。',
    },
    date: {
        after: '{0}は現在より後の日付にしてください',
    },
}
