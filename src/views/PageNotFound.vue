<template>
    <section class="page_404">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="col-sm-10 col-sm-offset-1 text-center">
                        <div class="four_zero_four_bg">
                            <h1 class="text-center">404</h1>
                        </div>
                        <div class="contant_box_404">
                            <h3 class="h2">{{ t('page_not_found.title') }}</h3>
                            <p>{{ t('page_not_found.desc') }}</p>
                            <router-link
                                :to="{ name: 'home' }"
                                class="link_404"
                            >
                                {{ t('page_not_found.go_home') }}
                            </router-link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue3-i18n'
const { t } = useI18n()
</script>

<style lang="scss" scoped>
.page_404 {
    padding: 40px 0;
    background: #fff;
    font-family: 'Arvo', serif;
}

.page_404 img {
    width: 100%;
}

.four_zero_four_bg {
    background-image: url(./../assets/dribbble_1.gif);
    height: 400px;
    background-position: center;
    background-repeat: no-repeat;
}

.four_zero_four_bg h1 {
    font-size: 80px;
}

.four_zero_four_bg h3 {
    font-size: 80px;
}

.link_404 {
    color: #fff !important;
    padding: 10px 20px;
    background: #39ac31;
    margin: 20px 0;
    display: inline-block;
}
.contant_box_404 {
    margin-top: -50px;
}
</style>
