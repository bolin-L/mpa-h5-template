<template>
    <div class="login" :class="{'login':actionType=='login','reg':actionType=='reg','both':actionType=='both'}">
        <div class="login-inputs" :data-childlen="this.types.length" :data-button="this.showbutton">
            <div class="login-input-item login-phone-wrapper" v-show="~types.indexOf(0)">
                <img v-if="showicon" src="https://51nbimg.u51.com/265f4161af704587904a9439d57d490a.png" size="cover" class="login-input-icon">
                <input type="tel" placeholder="请输入手机号"
                       class="login-input login-input-phone"
                       @focus="resetInput(1)"
                       @blur="blur1"
                       :maxlength="actionType=='login'?16:11"
                       v-model="regphoneNum">
                <span class="login-close" v-if="x1show" @click="regphoneNum=''"></span>
            </div>
            <div class="login-input-item login-pass-wrapper" v-if="types.indexOf(1)==1">
                <img v-if="showicon" src="https://51nbimg.u51.com/748f0f7c996446c896b947cb1bf911a2.png" size="cover" class="login-input-icon">
                <input type="password"
                       class="login-input login-input-pass"
                       :placeholder="passPlaceHolder"
                       @focus="resetInput(2)"
                       @blur="blur2"
                       v-model="regPass"
                       maxlength="16">
                <span class="x" v-if="showX && regPass.length && x2" @click="regPass=''"></span>
            </div>
            <div class="login-input-item login-img-wrapper" v-if="showImgDiv">
                <div class="login-img-wrapper-left">
                    <img v-if="showicon" src="https://51nbimg.u51.com/6079e02d15914b6199cc58631bba0882.png" size="cover" class="login-input-icon">
                    <input type="text"
                           class="login-input login-input-verify"
                           placeholder="请输入右图验证码"
                           v-model="imgCode"
                           @focus="resetInput(3)"
                           maxlength="6"
                           @blur="blur3">
                    <span class="x" v-if="showX && imgCode.length && x3" @click="imgCode=''"></span>
                </div>
                <div class="login-verify-code-wrapper">
                    <img :src="imgDataUrl" alt="验证码" class="login-verify-code" resize="contain" @click="getCapcha">
                </div>
            </div>
            <div class="login-input-item login-sms-wrapper" v-show="~types.indexOf(3)">
                <img v-if="showicon" src="https://51nbimg.u51.com/748f0f7c996446c896b947cb1bf911a2.png" size="cover" class="login-input-icon">
                <input type="text"
                       class="login-input login-input-snscode"
                       placeholder="短信验证码"
                       v-model="smsCode"
                       @focus="resetInput(4)"
                       maxlength="6"
                       @blur="blur4">
                <span class="x" v-if="showX && smsCode.length && x4" @click="smsCode=''"></span>
                <span href="javascript:;"
                      class="login-send-code"
                      :class="[btnColorChange ? 'login-send-code-counting' : '']"
                      @click="getCode">
                    {{btnText}}
                </span>
            </div>
            <div class="login-input-item login-pass-wrapper" v-if="types.indexOf(1)== 3">
                <input type="password"
                       class="login-input login-input-pass"
                       :placeholder="passPlaceHolder"
                       @focus="resetInput(2)"
                       @blur="checkPass(false)"
                       v-model="regPass"
                       maxlength="16">
                <span class="login-pass-error" :class="[registerPassError?'':'error-move']" v-model="regPass">长度为6-16位字符</span>
            </div>
        </div>
        <template v-if="showbutton">
            <button class="btn" v-show="actionType=='reg'" @click="register">注册</button>
            <button class="btn" v-show="actionType=='login'" @click="login">登录</button>
            <button class="btn" v-show="actionType=='both'" @click="loginReg">登录</button>
        </template>
    </div>
</template>
<style src="./login.scss" lang="scss"></style>
<script src="./login.js"></script>
