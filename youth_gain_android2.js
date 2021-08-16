/*
更新时间: 2021-05-22 21:55
中青看点浏览赚+看看赚任务，手动完成任务，获取请求体，支持boxjs及Github Actions，多请求用"&"分开，点击任务，支持自动获取请求
https:\/\/kandian\.wkandian\.com\/v5\/task\/browse_start\.json url script-request-body youth_gain.js
https:\/\/kandian\.wkandian\.com\/v5\/Nameless\/adlickstart\.json url script-request-body youth_gain.js
  强制增加中青看点看看赚入口，和签到Cookie有冲突，请使用时添加，不用时请禁用
  https:\/\/kd\.youth\.cn\/WebApi\/NewTaskIos\/getTaskList url script-response-body youdata.js
多个请求体时用'&'号或者换行隔开"，本脚本可自动删除失效请求，请须知 ‼️
*/


const $ = new Env("中青看点浏览赚&看看赚")
const notify = $.isNode() ? require('./sendNotify') : '';
let startArr = [], lookArr=["p=zUJybc31G2V0%3DUiVImOW0NxgHxY6TZ0me3WBplEX2kK6ARh3Wcs5Z6YN8CyEl_D54EwT96bYbNNifVtpS46KLLlSz_q5Ld2uJsTR7DoqkLJBdm52Ri_wZixrfJvkPlWjNiCI_u-v5RVDXrGcTVT-D50o_H4QS5TPxvboxHU_kC2upRTxToHxHbU9sn8xqeEHREAsjCLp5lRS0xPy1jYr3k6bnX0C5NTqZRb45rSgnhICdUzVh7_7tAnyd2RcuACF12HJ_Hz9YJA1pgpCaT1CwO5j4AE3JhnnTuKOXx323kKFtglFX0yBvXLslmH387E2D6K2uD0c2XRQ9GRmK4N7OFUY0oM54sDyXUHemTaccvYE2p8j3ZwN3fee_snESeA95hHF1g9Gn69GF2CLr79C-xn1TOA8FloB2aAnlT8CS-WDA0Ql2hDb6lFIPeBCw-SloMsnSXpIFxc-jr_040qpDN1JbjmaAc2I8v6NeLkXVoDfEFpJm-fk1zSAUNvbqwjF42rbh9BEkiPJzG8pH8K6FnSghbvITX0i6UEBCm8ZwcDvAKPik-KT-gRZFFYM90M5N2Hw2k_LnOXvmrBOxFtbmGPd41tsS39YWj35tUi-1Gaanq1RvNFcTeBVpXiSShSUF_9Gvz7VYi_O_jXVDeJcS_ZApIJ1FrDxzKRt6ZrEznhUH1Q0rzyGiIqUQueTr32uONjuLaHeq11o5KpSplt345PZaKkhHMido_2vxT5ROjvKpc0EseTqrCyWFsOO1QJEJndiojoV7zyhdW5UFA_dkoHBX2afSUPYVmd9Na0beJVZ1GNL0Wr1Dyho5hihY2PWt4IlavpE7MyR1DnF01Nj70CP2b39fCxGJA8GMWnHTVEIoYEVTUN-_3m11yngm92wUhQxvqaM09FWXv29P5cJHRylbXTDW66_sJLNm0KXvDUcSOGTr6Rm-DOd3QLfosbcxMKwZtmGT0q-2GiQGlBd9lqVzsPv5fLnEjdFPlfg2Eu9ZaLegDKxX1qhiJbHZaiCZM5lMVvZpaJW-rcOTDiiy9KvoZGtRiVQK7epS4kXfuE2HgYcHnyhq1ga-g4pvkJUdkWFxzZfhh9Pn2oVWBeVLDztZLuYSwLyfwctCwJhArcgReDUhjSXosGFpcB6zQJg56CLhnvv7bCTcPIrib7LNosvV8J7InygEZ1c5m1ZKBQA084ZTuLbfgtyDPKMuhP-d-k71zgiYF2vm3brtQNAuT3o8pmrCgHLzHbvSL9ZJlmSkUqYSTZa7UlVKTQQssTLm1H0iT4AunmXh9MkIQD233YAFV0Aa7oKydWJmsGKoQ9reLPXfotKmMZs_7fB4IFfne7lz1QIH8fEql-ohRqc9I2YYgf4PW0lzrfbyjIJ3Uye4svuX_LSu6fC6wQmDdThQSWwPabKTBqGOpJ_L57NSZ6v-az6-X1IJKwhQSinJ5KTz7RmsuEB10MYlqTqBJFwx6w%3D%3Dtv", "p=MFbVGOYyXwIo%3DPsKtOYIB3RdqoJHdaHd87GFTkztkkqfqeo7xHS6ngkExufa8uBBP_xatTt2qLNpTmChOj_gT4la3LxjRSKZcP6YnVaR41_kUnC_eBG8VntW3zDYJ0uEfGHv2jeS3juc2WuweGvagHODV_R7W7Y4yV9_p0hnF4_90AccZTxof3FAKztJN1qYJ-XrZJnnFMudLttjBFqn_bQxaH2kf6-bSD5zcySUZsJv7DYmcINjioy6L2kdLMBOaU61Y8PebFI8gYpYTtS2z1khzvTXjPvzZKYLHvznUborVj--m23Q94zFvEqvpMdD9EPgQfy8dPtmmSB_JNzJ2Qe61P7RVbXH_Jq0okP9B4PX8Nr5LT2BDuWp3MNzFIpd225WDJYsg2cLney4PpTtHHRTgUtuFECPXnY3Hf4UYvHUZ3EVHDw1JrRg079VoANl_AQZ9oXi5R0Dar23QdPJQUyvb655vM1HlCbS7ia0LBAhvHwnSa0Y9KVIqhEFJw6IwOtkGWp_Fcp40do-VS7IcPH2_Tr627NgKyj_OEJ15HvlZvm1ZpbUGrMaeUutcopuHt5OD3h2Gy5vQs1SwI1Eg3GcO12ssnhzzkKkQq2Fodt1KS-ahhFgK-U_f9njtbdfeLBENp5FaJuhEWyWL7fqkKNmsysyCpyHw1sHGbyExqrFe_0fR4ph5VjquNFEn5DgQtQBHPGHgoAjOC6unIh-0Prg_vWmpkw8PpxlRLn6Mlfh6A3OyzpNmQ6OeyYLoNkUzWLPqoJkXkSGouyrtA3k146dAk82TbHxAgKVCcEBGHpTL5oRD-lYfVLz_aqRwvnM7UPz--KS5Qmb1WWzHPqc6SMUDQjEQx4qBuIp3FBVfQcNIPNiyA7Nj6iHWsBJoPXXdgZsH9GOun3Z0Ia2adHOMg_UHWbyj7hQuryyadbsK2otH8sJg_3tX6kXbkpAVe-NPevANC49lli0L1YpzpTdtAhti2ofYYFSwNwumW-pXs6Mra0l8VTQNZOhX11wu6ZQCThkkVu9E_l3I161Mtao8yZQq6G0pNgxMKUsZXnI2JeNo4-_zgLmbPi5NMjheBSGfIbPp9W5KAQr1TgkF4b281EVGt1MA9ZQpZBlg5bCSSO5aPoFqiyrwBD-ReS3q4lkZ5ewe0B59jfG-D6gpHreYGsyFYfDqMMHPSq42WVRWWFnZqS5qHY7N-Y5Mhf2bVR4eFreohVU516igDtXHa8tNLtrDKGbHa-4CJZiqoD25Gv6_BTRiBFFMMh_4cDpSm_mnIRVRH0b_-lnCfOqND6bQx0e7xWu3sQTMW4JQUtNPP_FkXwmFxTUINdXr1EcgyXaabaGTdkBmOLyLXIiVVNnkQSDoeY0Zkxv0V9JGyXCpnXYanWiNmaxJIGy2HlyZKyJyzFXc3PziIpO-wGrOHtVIWIfe06nqvPxxEsaqjTCHtfutU3bB8jL5W6VODG_4iEdk9Q%3D%3DR", "p=ycTMBiVxDAfc%3DeYMRZIJw4FH0NtWEkgJs0ejE5zBStiMzs4YSlEKO0YxsOwFzAPNtXJ89cR1kRhq2Tun928bn_oLXMnhieaGYJmfLy9ydgLgt5sMtLTB-EziOe_nR36IO8EZlY0NATy-CDjCJthXGjCTpKAlPhHEuLJ8a4a-6v1gm1J5XQg5UGUqygppleV1ES8gOyXhOD1AQrrjHZzs1WVotMaHnRdMzDiH3fPW_UF4jnoyj3NlVmDGLG8rMzPwel3sjxMuBNCZYnYy_iOvXo8MAT-6meQf0IoPBp7pJD0wqs61-9fsui46ZPKSGYguDITMQBpLVQGgtiQS8ifUv4zO56wwM4xmnQXYYkQsPSEu_AfOLQfdarmksX78nLcQUTAUBXYvAaVcRCnYv68PzVuDh4QWQNgWkwzWRtotHRtBT2eqgwITZIrHkvc94zJrk9dg1qIlqwYKx9PXPW0U7ul7jCTFYfPWJQIk_NxyLZRV0115ImeCBM5YamV-_BabZ8zkCknAHgQL6nV7_aUi60vlcOqACCJ4FoDWP4-cdg8Fp4FT20DObCsv4F6Fu4rvWsiACHEPu0mZRYHf01KAKD4WJZ88Pc2176B9IPxh5PHOd4KqStq61P6RDJsWS7fp8TOEgn5Ody4CDp6oPNNHZK62xnJder8EWDuY-rbJNTWtvJTlK3z7P_ji3cC92aksWFckjmKi_6fKef4zdS2Gc8BJt-pFYOyY2XS5nhnL5zMJ3vmSjCk13Pl1Xt7qOazw7ioM-Lr8gQ--NGoB6TS-adlDjmvl8PKC3oSFpqeqm8SDlAJATcwjDLbEsBqfZdW_EfBv0hifjVN7uoI8uec5WLY0C_4ly1-BuyWwiVBAV2Fn5UNnwzMvTc0_ifMDGo5wOik6szYftQbTepAZv0E5UjYRywXgijZT6CpPMPCngQ0m13S4kHU1D6Px6d984Q9Hdb6V93fCANTz8IP0paR_cgLe0288zcCzNR5Zw3E-X1IeczeFQOkKcrOS0XSjwmPhIkxZ4t-zVeOp7LQ7hfv4xU_rREzP-tLAXipitJy4UmA-6OYqkR46PuGrj8rhU4no4VeYPW9mBjh1YdVxy2jOhayOXE092-Bb7mRe7nHrnplmhOZWcUwel8JyZgW171vb6iAHsEF3VfbYzp8T4bIEjw0YxuHkenc0inWwclrhJgpM6AVXckCadmoh0_zIv--DrD8AltbHSW-ckLAzG6M3ZFe-kpv-X0Lgiq7zL_ND0ei5XVV5qw9os9lea01lucikXBS331bPI4CHMfIBThd7V4H5MQz8oIH2NBCFsGJLrO9F5QMBrcbtFa6PrwkZeqTSHOq3dbSWirJA_bUreGONtR1J01j8IIbRJ71HeMY-4GJIj_Jhtm9TGWvOlttxPo0PO8mGfvj5Ch5EnPIU83KSx36FXCgamQ1ArC7EmWpXVk3tXegEj1PCB1UoaeFb2qTyBiw%3D%3DX", "p=NYdVi_XPUOzA%3D7ioCfKCMWbJ5I58eSuM3lc9njhOZrSvb2XZgR5FHpHZjAGPgVVSPqgQkceB5RTG63NgAKuSzdJ3v5rOu5vSJ0nE77V8WgE0RqQvnkn5nVc9MxIVdXrelLRz7WeAjcVjKW5KIvgFQ0owmMCLIUm97sStHvLY6ZCjf27UMEr_cz9nXHzZZmkGW7nzMcPVHdqIV7lukoSweLm_xqvNxsCAGV41udxUidkLhqKHX9ZGbjrv8rbLr6mM5MQWzlxaaQY4v9d4gn08B8WYaX0Yn0pnGnDbSp91CAtdo1_C5XjGfeF-cXuaqhL484xwnu01M6Wh8BAvVFhutoaf5xBKSK95cxwU385XdyT8t11X9UVnGgh2S4xwIZ9OA1Z0HXWhWkubw3cFTcCB3batk7VRKrYmhA6Qix96yOzNQqcfj4sn5uevgWtwLZ8S-_NZcMWnMW21jF6I0217jC4ManNdAruiK6OJygdNpXjR7qKqF4-CfLJ_gvRjLeof0t51fWU2MOKd5bW0ssB4hyxZR1vkZoiIjj9NtPhPEeMUPP5NWnxaPmvrdAzrl-KIOWoPbIaywq186nA40e-EXoytF5McoWbWFoAVFLqJEX95KikLAYhFJmmjSFlmQL-BFLV3tNPtqNLSe8wbRa7DVfNaZHBaIAhDpdpa211oxl1xUG7Mdhf_bM4TTL_aGYnS4iKJYWuK6AYbnqaNtx8noR83MpokvFOkqCj47cIwDf4IR8hOIcPAmhT-Yf4IznYWXojhgtrLKPKrZEUK6_MQ57TSWe3E6wJE6yNAKbPnt4HwG4nTfpqZaGAvbCITSnFJatAokSpd-gLjMTlMZyaapswFh5yYTJmuUcVRoE27UcWeNu0hFqTf7wdZYrtmOom3KmfswvIXFDZAoTD4bmeO42GNqedg9_aiNETiby8xpIaDUaDoHjZdY8jUsPAGbckxPB0w17ymzDjrRtyZsY-I4vDnLsURlMZJb1T83YF371GzFfrORVvKY6uToT4dGRIipfhPftrNtTOVBcTFpF0HWy94xgXkcVbOsW9KuAj-mEitcATTyJrbYjaR1BLnYzkU6TFy83Z3B2lSSWFE6pskYXDev0ZIJb2rFrWWdrCJ1JRibMeUYGZbNnsbm0igDIBYfKMZliqci5pbBfmNerrxx6FGtL5zwL0vCRpje6NqLmY9Lkh04f5l1Ea7CswTpfLcBSFxIkB1ya-ivwpenWnExySS7p9WkTgpcgsxQLNKzd7nU9zKmGbpyajTAOUrvJ3gWDXSYgWKoAhg1zJor1KLRHrmwyAtAdyHuKP59oclRFmWd9pBA7z14ObYGNwRTo25rHKSmFd-6fQ63TWbIQAlpM-NvIclkY2rQjO08vuvIu_2ICfgh630pby_thyno7LcyYuTYQ3Hm6XfxkORyJiIaMKGmGsyBeYNpYW3Ro-wkJPmiVEPfGWep62IYSwSQfAytyg%3D%3DIR", "p=aFbVGOYyXwIo%3DPsKtOYIB3RdqoJHdaHd87GFTkztkkqfqeo7xHS6ngkExufa8uBBP_xatTt2qLNpTmChOj_gT4la3LxjRSKZcP6YnVaR41_kUnC_eBG8VntW3zDYJ0uEfGHv2jeS3juc2WuweGvagHODV_R7W7Y4yV9_p0hnF4_90AccZTxof3FAKztJN1qYJ-XrZJnnFMudLttjBFqn_bQxaH2kf6-bSD5zcySUZsJv7DYmcINjioy6L2kdLMBOaU61Y8PebFI8gYpYTtS2z1khzvTXjPvzZKYLHvznUborVj--m23Q94zFvEqvpMdD9EPgQfy8dPtmmSB_JNzJ2Qe61P7RVbXH_Jq0okP9B4PX8Nr5LT2BDuWp3MNzFIpd225WDJYsg2cLney4PpTtHHRTgUtuFECPXnY3Hf4UYvHUZ3EVHDw1JrRg079VoANl_AQZ9oXi5R0Dar23QdPJQUyvb655vM1HlCbS7ia0LBAhvHwnSa0Y9KVIqhEFJw6IwOtkGWp_Fcp40do-VS7IcPH2_Tr627NgKyj_OEJ15HvlZvm1ZpbUGrMaeUutcopuHt5OD3h2Gy5vQs1SwI1Eg3GcO12ssnhzzkKkQq2Fodt1KS-ahhFgK-U_f9njtbdfeLBENp5FaJuhEWyWL7fqkKNmsysyCpyHw1sHGbyExqrFe_0fR4ph5VjquNFEn5DgQtQBHPGHgoAjOC6unIh-0Prg_vWmpkw8PpxlRLn6Mlfh6A3OyzpNmQ6OeyYLoNkUzWLPqoJkXkSGouyrtA3k146f_KFiq5kNZFeX90gzQeJOrSeb4g8yqvnUTUr739bDPwR0VB8ZHJZBLKynYfkNAvHbFGxpvKK5dRsggF-ZAK2cP2R1N-ZohEftNo-uuUTci6rTVrS9QFH4-p2OuwYqlencZZ4sXe4sbGOdH-llISMORjrbArRD04J9pnVGMmw0_Inr0oxO3axhR6ELg6FAmh27rMu8y_sm7icNWfxPL9aNy86mL7HBsVS7-3gwl6PJTyFYpAyTCG-KzX9ySZqP7wcaUb1bDU4-IrLhaR1hHIeo7kAomxw42m3yXchlnBYkx8zpaPXgiSzRjrKN64FNIcFJN4AWWlryFc_HU-WBWWhINBHj6P3RJJHYrFJEXcNBIcKKU55iVF6C6dV3xPdkA4jd9SLtVILgKQWZXErXt5ycYCeTFq9mpsdBnffnSkryy10M4t6lxW5hhBX-4YHYW-gEhiGD2K15sUo_svjPdfoC5lTMwJR2ll5_-dMtzXHPPOX-bl67SxBnHgnSwiMlG80e4MwGIiyaLkxoBADXeHfc7yFDWC7qUgg27K19XV2FT9UQjaj0nJgnUwIbKWEoA5IduJeKmOp4sndJjJ00MIV7zmTJ0RlJogmz1S4Bog0eIfeydSVqvZdUbR1u32O-A5y9O-5Xk6rfcmQwTFBoODomnvCpGaXz5e04WcmFRElvkXw%3D%3DT", "p=PCWwRj3eGxCw%3DOY4T2_YuUnfMV_DVMms3dy-7E68zUruwOuq80MZh2z7wzxaSQTdW366z3bx-AmivWumxRqrXHwVFopOuSnhImOE1ZRiPWSwVte3S5-gv94OoUE7-hHdFx5XGvObl3GsZ1s62eD0xcecYYlgpUhScxLeQIYzSxQM3UprBx71e9WFvhPwiPMlChQ63Tcowzra5zhmhHFgFsvUzyM-Pu1d-grW_VJvvNyvT-Grs9EwEgDf1Qq_clopkN7f4qS-irfDvvpMFb2Q5mROHlcqQUrnGJYqFahD9GOT5MYe9jgzDnvVBQ6S6TKTPpjaIejbB--YWgXYpRpH7ETiLOr_c2GwJB7BpGCBkregXU42kjCEhypbMNP8561jwEtPOoonNFvg_5487lGUjo1YZ2RznlxRsktOUFYc2S4QLxnQ1OngIVQnCpIPDmcT-cm4sw6VI2vC8hrsKS4t59gXL1HMp1mEF6H2_Uf_rMEDPpFWl1yePus_O0wVTHC_uqM-3HGZFDrx2kF46u1x0-zTy5MXruYPoNuuQbbsHLk5z2w6PAGBpKi7aiRb_z_3t64-43eZYq5swmCYS4q8hbjx5FPVklDBftcfpsRtz_Hdr0JqygEdBXfQoWxbIHPcdZO0Bq_vHIhiACC938Lkc38mcWdYY-kUBThEjRJsIlZtbyaOb_TBkVgsEzJ9jUtJfvndQXyEQQBn8bQnleebALVEOtHXcpwFusMzOXQQKcaJaHfBhWupuDw_ICQqwWEkJNs4_Zd9_FWgfP6cukEc9HX7Cm1Sl0xb040zx_-248hAdl-MHaiH9Iu2kDUpBiN_vLH_D0bJNyBAS3V-HK1wVdxaHgiL_T9-jNCkrBIIy2ec1R2CN3mI18p_aQgyZpdUrTkxQqbqUTbC98TRduUbxaXqZpsR1IayiT7LYm05yiS205ZaK59ZY_aYOxINKKhvJz6WyzFxX90P6_XPnSp5hgCeWKVajYmy4LcEJ-WvW2DqfNfWUTEzt4vDSguqBwaqDU6c7VzctIZBouzmCGq7gSf9lq5u_fDy59LjChjULvGb6ThprsopohrTmM44gfBp-6qLsgNIWd693BKjYMgya_eRr4Zog2yL4UdnheZaHM00YHx2rXJeLffQoG8rAf65XJ6GSVVGeLsihXIFNZqGf9BGBWs_3WRZNFIi_ANw1h3tK8CitMGv7z6CBNFEQ37DBus7nhEG-PtdS56i4MjLqaClLuqgiuz-QR0CqmqGg-fFp5eGNPd2ptjU-4MBdfh5IlY-AMO7YU0Q4fgQvHwrFQr5fXiRmKewdGSSsKmoY-9TE8QaqOCADx3cswMLHIpyd4mfuQXbDMEAqO6o9c8fc-n_TC45fEUYq8cma3cWp-47pU4i9qmW6gqmf0WbyYJZQKWLeqlfsIluSZzEtdXvfuE-zPnxEJAfnTbQNFC_OrS1g_cVV4yVZk_8947gYTEW_jA%3D%3D", "p=CFbVGOYyXwIo%3DPsKtOYIB3RdqoJHdaHd87GFTkztkkqfqeo7xHS6ngkExufa8uBBP_xatTt2qLNpTmChOj_gT4la3LxjRSKZcP6YnVaR41_kUnC_eBG8VntW3zDYJ0uEfGHv2jeS3juc2WuweGvagHODV_R7W7Y4yV9_p0hnF4_90AccZTxof3FAKztJN1qYJ-XrZJnnFMudLttjBFqn_bQxaH2kf6-bSD5zcySUZsJv7DYmcINjioy6L2kdLMBOaU61Y8PebFI8gYpYTtS2z1khzvTXjPvzZKYLHvznUborVj--m23Q94zFvEqvpMdD9EPgQfy8dPtmmSB_JNzJ2Qe61P7RVbXH_Jq0okP9B4PX8Nr5LT2BDuWp3MNzFIpd225WDJYsg2cLney4PpTtHHRTgUtuFECPXnY3Hf4UYvHUZ3EVHDw1JrRg079VoANl_AQZ9oXi5R0Dar23QdPJQUyvb655vM1HlCbS7ia0LBAhvHwnSa0Y9KVIqhEFJw6IwOtkGWp_Fcp40do-VS7IcPH2_Tr627NgKyj_OEJ15HvlZvm1ZpbUGrMaeUutcopuHt5OD3h2Gy5vQs1SwI1Eg3GcO12ssnhzzkKkQq2Fodt1KS-ahhFgK-U_f9njtbdfeLBENp5FaJuhEWyWL7fqkKNmsysyCpyHw1sHGbyExqrFe_0fR4ph5VjquNFEn5DgQtQBHPGHgoAjOC6unIh-0Prg_vWmpkw8PpxlRLn6Mlfh6A3OyzpNmQ6OeyYLoNkUzWLPqoJkXkSGouyrtA3k146c3fybODmoHPR2IQt6is1gRPxOGOMpR5L-SawjIR9uw38cxutSdzdKn7-csn44d4GgZHDj8-wAUIYe4a8lUnXj8z7wCHAar7rZv4Uvt5Gvn-2e3ILR6vqUbDGxhJfVrTN5xbtHOpPdY31a__p3D-vMFI2dh0fW1Cx4QaeQSvTXUL7hlwlbTphTsHICm9NcVmjOocLS7xJ2p7ZMObUbW8v2CRm_j8v3KU3oX3dsc41xbuKsw2c0TlOynv7mf5cNE3RJGCUBxbbGpsbNaSjk4hApXCXTT7bR1GeyiuJIz7E22RidW4ldMXpqjranGHRgeEh96oYnCcYfFyP1fTpvwqmAasWNZAoCVjlIp15oud7M0yRLmIiRBlJRtMi_ySbmea_gpvW4iso-Mn93LO-Qzrct7L9hz9oRPx9POVusmjtjtA8w2AsKl4V9QuV0m0IkDEaA4FE8xuAW9e38eBArfTCIb13_cbXPm1J7fXgO3zWNtYXdVjr3xMxeQgHTX57tCagWWmDv2cLMaGhGa434dnzv-eZMrfqK7QJ_enH_vzZAEnl11uHnO_RqT3apnMKTr70DuQrTUQqBD25Ss2OFjvMOuAFhuUCIbaeRmr7juoUooOaAgC29BVBAcSaKVsDS4dwa95_N0xO9o8FZhtFrLFI9HrwbL3yQdWDxndkp0KkXskg%3D%3DB", "p=TXU6PBNNsHKc%3DVtos3hc8_wX5_uHV_UwDzgWVCBYHDIjB3rtOd_5QuZ-rqas5h6Mus7dlfziTNR7LtPHmNKG_ZABUhXIKSHWviC_Emd0WJ61nx9jj2efeNOwBo7y8Aa9tie5enOJQmNHe31wbGlaK8i0R6_C4uJCrmAHsXNODH39Q-q1LwcSjfKdQ7rHB-BWxjRe3iA3NT_1mc5WdMV5M2Y3ur4IWaRrMCaDLbT8uTEnp7qdQNXmiGxL6L9yhu72kjSI0VY5E7k5zB19R5bwoYLt1c6OFeQE_GhTlBedz4qXmkMYjBmWjiNqYYlN-EfiT0AI0KPbcAZvfRxGe99-SVB9e5laLUpTOPVmVZbmrVeHRqfgjIsKciJZmJqLSQCgAvT57F9LdevtWwjR5IyLGOgDK7mqCLh_hlyUpuwBK4vdExNekeFzgCDHKvEFJDxi2chU0ukoXWx1Exs9XzACYNzOI62DgzbOzwNm080y1jdcXx5uk5Pf5-sHlG2GCDJOPfzQlONDm3bSXIIHaSdPJHo_SHBbEZeFzuQPcB9o7cVU_1F9l5334kHQcSuIAF0FZqwWOzIW7A7kVfzL_1wzEm9Ph8X2B0UORBoSzDBZDEy4Gh56YK-Usf39xjPSYBRbOkw9R9jL8Gd7dcUs_X0syB02FsfwSTn84BecON0Cnkhs5SNL7SeKUS2ngIGQuxqweVof63-g9rioCDk9HGzIzmgSuRq--ItsSpgmnH3ludErBYPp2kvO4jjIdJZHcFunsvZckIsqs-bu87x4OEbxlUw4wqu3ApueHr17kimu6TkNieXuZCT1DXjfOugO92tRtHjEPX1lGF7b5eiC-AkWaA9MS2MYTttzfTOwuOzKnJjEp23RnRIktRTbMKgKZWDChX3M8fTJcK7Rj9LkBT69L3kJWTETyA8fSn8hLcuUPDPuHKCxoqhNOz9aFmbfrOu1wLU0BczFb4HhtKr2qEJYHnuLfBLmGYYOyKxYr_F479XsbR5L-fT9NwAlBOK3J0sEX6S7lEmaMbunkBnPHCcmK9xToILWNuzuMQb7lc-Uy7cSyHbF_x-CTaO2ykCt3lJt7pVMJFnUeXAvjdJbAKslSJXz5108sFA3qGuFjv_aqNYP9-s0usN4xYABInmgqAZJ1V4bR6NkyjEy49WtIxzjUlP-x-iOIZGDLqhGxD2-MXSK2J27mLAxT1JAPoekplcbZ3ZwwdtJrpQz2ujBgLnrGTEHnI-Fc1NeDCS1lEddH27UWF9UAruWBt4W3Ht0CcPZcuBo4kL7E0ntSlqKcjQIUtdXRAbHAhjNHp1Eh7L9DLfzXRf6WEePvKV1Sug5VdQDnCd7dk0cO1NxN-kyyGYEVZnwwL-LlDm0938X1dIKTNCyLJ_MLL6BcS8Zyl8SfRBttcnKidhlujqE8F0n5ffsaQtovPZ9hnuiFfYkuLL0EblC-y45EKWWSJjoxywsFZvxXUw%3D%3DI", "p=qXPkPrW1Kghg%3DEfRWZwWkN8jjFqqFusdvroW4aOHJO1LUezCajo6W7oGa49gUCYPeJFtwTKQArjhoBQYmxeBti8nW-7hWoJilpCdk5PPI65O3X1Ry9np3pmBhfMiDcaZ__pjNecp_oxZOqvs1boaEs5kj1Npd7Bj15CWWyshqtFWPWOTB0pZdGqEtkiajPMG0AekiG9lIGSYp8oKY0bQ9Y-jqCa1yeyCs8fD8DTtaFwN-K_idJSj-Fvp5dCn8iif6oRCTZQOCn0PUJIuvE3fSokBLZnMkXa-mdvluqCUYaHO-1AWwJLqs4t4gxs0ToEuv-bk_hW7A6Dh9HZdgKXt9Zo7lGFafWAHDrNCMNfatMStQsjhjDwKzEOK9aSWZAkorb7edyTlQPKE5GpYQuP2zfN014HyVGth6rwO807SlOx3mpgdMvmYGOlBgIO0MoM2QsVY_14KeT_jMjA1zBTpB2A3xriKb8OQsrH99DZ2YjUdQLPPc3m1eZUkCwjm8iSf-FgmtPeymeiljMeSIEDzK0Ey3KadxW5jlS9lGR89_7RgYpbX5W6Fp4P93j-GPB2-fcAqobYqVNRT9wVgVVcA1wFnCaveulpAst9N5-lXHsZNAeN2YX3nfNw2JwcKldttYdmsCO-ubYue-vNw2TSEE7TsC0fxFDwSWvpQ9psT9ktGHm4yXYf1ylwpqDNsA21UYwYTsmSMJgX4eiK7E3iQyi8oCz_3WBxDInpWRHEhqVqcbkmqDx2g9Ds6de4E9kQ6EW9XuaVDpPqgl1FbpB-wjUODBsIUIV9KkcmPYjrvSWRFCcZDrlOrybB9j8yAN1qc_r_jgjc3nCXL7pZECA7FyRCdfmaT2OCl5aTa8eGF472XCethRu9bRLWFsRs6I5JuJX12HH72Gx2HhnutHH6Z5yvqHXXqCcCy60Nx7Vg3sw0yYzGvJ7mF7AiOycr4KJb8nqKgPra6qMXsssbnRJWonECk8OKjtzy-dNB22SpDpyn6cWnPtxKN14GNfVwdXrcLztXeF7x9aMnp7Jdy3mrLtVu9KsuWaSZsdpaI8T093U9xSRAMwDhse38aLKcPjbfvG084RfCXWDzb_Tycet_wuIrDns7TZyV_Evx6SCX0JTbRSwESbpMYiqu7l3ZEOP0A5xnsX37BKeLOzPbRFA_EH1vMG9DCXLGmLA7YVuY38owdvp3A5Hy_IAVNWdTDa18UB1OoIgPnolraA7acVXCNduOgJ_fopUVNv1lVMDzb4ghh_LP3lNvgCXBtKKye5pg-9LNW1oJBkL7VkIh5TVpK-BykbFGXfCwfThQh9_B6DfiH2qOTAQIIoJzqXuF5LsgleGaLOy4aKTf8B911J5bBH7t1jXwd6r_ayMfdVJiHUne30LgDlZn90mujvn5VVFPCCHtlUJ0EJg4V08moHRbeOcgsrtHaOtQATpeeQGWhNdvf8a1ciHiTGSngRwWAxZM0x7A%3D%3D", "p=lYdVi_XPUOzA%3D7ioCfKCMWbJ5I58eSuM3lc9njhOZrSvb2XZgR5FHpHZjAGPgVVSPqgQkceB5RTG63NgAKuSzdJ3v5rOu5vSJ0nE77V8WgE0RqQvnkn5nVc9MxIVdXrelLRz7WeAjcVjKW5KIvgFQ0owmMCLIUm97sStHvLY6ZCjf27UMEr_cz9nXHzZZmkGW7nzMcPVHdqIV7lukoSweLm_xqvNxsCAGV41udxUidkLhqKHX9ZGbjrv8rbLr6mM5MQWzlxaaQY4v9d4gn08B8WYaX0Yn0pnGnDbSp91CAtdo1_C5XjGfeF-cXuaqhL484xwnu01M6Wh8BAvVFhutoaf5xBKSK95cxwU385XdyT8t11X9UVnGgh2S4xwIZ9OA1Z0HXWhWkubw3cFTcCB3batk7VRKrYmhA6Qix96yOzNQqcfj4sn5uevgWtwLZ8S-_NZcMWnMW21jF6I0217jC4ManNdAruiK6OJygdNpXjR7qKqF4-CfLJ_gvRjLeof0t51fWU2MOKd5bW0ssB4hyxZR1vkZoiIjj9NtPhPEeMUPP5NWnxaPmvrdAzrl-KIOWoPbIaywq186nA40e-EXoytF5McoWbWFoAVFLqJEX95KikLAYhFJmmjSFlmQL-BFLV3tNPtqNLSe8wbRa7DVfNaZHBaIAhDpdpa211oxl1xUG7Mdhf_bM4TTL_aGYnS4iKJYWuK6AYbnqaNtx8noR83MpokvFOkqCj47cIwDf4IR8hOIcPAmhT-Yf4IznYWXojhgtrLKPKrZEUK6_MQ57TTk3-TuCDQlvc99Wo0kbVFYe1Pg26kKz4Puv83Gwr3qeFMW-Zmn2-1kUS-9b8eieNoVy6es4gxaY1Zl-aiUx7vT1Ob2KzT--5FzKmwzFn6sif3Gm3XEddmxiyWwNxFfY7qo0nl6orViUIbIKOKY5PLj_sG9pdcec8eb0rG0tBpcAC4-hmTd2CxE0JD2ylxwCQu7dHbn4JPcWuHp8zPu9lUi8UTN3lAK9qs68q4IhtZqjvLqDsTgpUWW7x51azT94vCihTywjL6PhQT8Edm8rkOClCVgm9njomGlSCZ-_W9iinkOSFpAtUyqSowMw2uBo7OraMMVtl3U6g3Tq16vKQtUOJq12VkFY3lUYhLQK3h_jE6_6TgUkpOJ5tCQyv1k0QJiFIAiHziWtXBHP46G16tzurQwaHB9081zBIkpBYnp7jr3v1mFNsz-373UkruBcCfwhMpb5fDF9yJtZeRBjCGJWIxtYzlDsAblj-OC8xd5dETt-ATii3cN9KKgaNnFR8GeE7-WHf9O6BztLj7xzUdx5-CW893R1dJFrrQ0HuC1fN8_lrVQmQbHvSMHOi4AdREc4NI_YWRIo0-bHhsC1nIWBf3qPW1uRM8O1QLSm9AFWPaE5gzSb01LGn44Kkd3IxaFLkS0bFzy1T79zzk5MIUpFFl7moh8CpRuXNzHa0wWWw%3D%3D3m","p=Y2JgR8oZr6IU%3D3jJeRBx8_TqMKODKaSpA_eqZR1q9bNtsssU1yfodc1eDKseMMzXDNymoLyKjDQLg0KufwDiHw4o9QUsX-uaNJOoTpNqwloOjc35--Y6dW42EWbSK8jKi60L631au8PrPky-sJRgFJ1pt4BAJ3wXXy38AiQLRS5Anq6LZWu4-rNnFhjA5Z9dkAUU6BDS1fFGQ7CTcpFPAgD40hzWxcEDsfMkAIHTYkJkX2WVoG2jNcHejCSAxaa0HSJOUoBhB_M15f0GuFmxLSeSR0ItlyHrpOkfmoBqMRDoCjEQtHIxbx8YXzEeMPV3MH5xHZRxbj3ibgfIQfv6l7RpfgJ-aDJ-rk8iyTcK9Ms6H0Iohbob55XivrLcqzlThUCw9KTZ3RZud-VAtCTKxQDjITdzZAt-zBMmH0xCbRsl_rIbd2EeNvhviTYX8dRRkurURB0bdh20ZpjAqwohNlbI83zrZk_PfLnd1KRw78qKW8nCJk8gkAl9Ot78J-QA_PGHygI0nDAR2tNWtmUgAo05R89HR0g8VYQJuGhqWd1JuhMcaziMDK3SUVnClYrSuzYlTzyPcnom-ZTc_F8gHVrYSIU1PNYrgWNtKDpIzcm0Lbyb7O-IGsA_009masX95EON3Ec7dIkVtyRzTyGqRI203ksSZtINldvMxsYWW0dTnBMLuaHNMFuvpSIMZiLF0bXo12wnI3I8ieK3kqLaHr0MPxZpCYIzIE_jfvn54jzAl_lOruTsLqm9eRa_ICowKJNdNu7tA4dJ4eay7yFOJLME4htAsfmZ1FOrptKt4opou6fbsY9ncut6BhuG_z2AGQVBOWyGL3FpyZEq6SIuDsYZ9k2nT4VP58XcJL2jwpBn1jrCHJkAHSlONGBIaj2jqKE_w0AAHg6L9jLkHpb-WvGEdMMrYmovtIOHHsoIxsSrMC4vgf3kL1THcAZEnMqdh0AmLYBSnfjxMmq_qtWH-1A1NFTBqfGuLjXeAxTrHwV1dKvmaVTwkNBERisoBV8Kr2g8hy8mDAKNzc2xyt2FXgdVC9PVf73hBThk54xI4_D2RE7zWmmeT9bt5z8u-mvUo3avdAI-rLew17QB99yehxSSi6qumaAxI6yLELFUoQU4vYyLmaZsENuFGGakHeWXpTmN-dz0RbUPIRZ9Rn9Y7xafItRwz9dIF2RL_nZ6AFvRqR6G7_lMjlosz7GK2N3wTePDLGvMMALr7Pt78VX4kPcIiFIa5KXRwvDEG-tNhLlXozw4Gqh7Jy3PtnUrVuhU7spYv1N7R_DihsCNU98WdQKuB-0EU4RV_Ef47LxpNcqc7hTaXm-fzp7zdftaZ3j8PPULHK2DfB_z-Q1QbCLdR8mlDHvlmedNq69hI4GvhAp_UyacqOylslY2hcrew60_RDMfc9WwLAXT7lTySYSfCjCl6gVtM4A-Cl5WgL7rPAwvHFgOcRKaOn4bPK734OuxHyg%3D%3D", "p=CFbVGOYyXwIo%3DPsKtOYIB3RdqoJHdaHd87GFTkztkkqfqeo7xHS6ngkExufa8uBBP_xatTt2qLNpTmChOj_gT4la3LxjRSKZcP6YnVaR41_kUnC_eBG8VntW3zDYJ0uEfGHv2jeS3juc2WuweGvagHODV_R7W7Y4yV9_p0hnF4_90AccZTxof3FAKztJN1qYJ-XrZJnnFMudLttjBFqn_bQxaH2kf6-bSD5zcySUZsJv7DYmcINjioy6L2kdLMBOaU61Y8PebFI8gYpYTtS2z1khzvTXjPvzZKYLHvznUborVj--m23Q94zFvEqvpMdD9EPgQfy8dPtmmSB_JNzJ2Qe61P7RVbXH_Jq0okP9B4PX8Nr5LT2BDuWp3MNzFIpd225WDJYsg2cLney4PpTtHHRTgUtuFECPXnY3Hf4UYvHUZ3EVHDw1JrRg079VoANl_AQZ9oXi5R0Dar23QdPJQUyvb655vM1HlCbS7ia0LBAhvHwnSa0Y9KVIqhEFJw6IwOtkGWp_Fcp40do-VS7IcPH2_Tr627NgKyj_OEJ15HvlZvm1ZpbUGrMaeUutcopuHt5OD3h2Gy5vQs1SwI1Eg3GcO12ssnhzzkKkQq2Fodt1KS-ahhFgK-U_f9njtbdfeLBENp5FaJuhEWyWL7fqkKNmsysyCpyHw1sHGbyExqrFe_0fR4ph5VjquNFEn5DgQtQBHPGHgoAjOC6unIh-0Prg_vWmpkw8PpxlRLn6Mlfh6A3OyzpNmQ6OeyYLoNkUzWLPqoJkXkSGo_3j7UQCRkb9GD97EN735FXaRr2UZeD6PV8cdgJP4Uz25DfnZ840PW8X6V_5KIm2OuF1p041XI1otTFNRmsfiKgugAS5aOIUV997KuLDIQ0qhXdx0lah5aD_04OC8IY2hwM9186gmvE3M1CJsnS62mDyQqFit4mg_KcpTa-nqdrhHPWgYds_s1kPrsd6Xbn3QdiCnVXWdwUXRJX8_kovd4w5hsp8e3BDIn8hIy-LOpRi5uA5-BaQSVNJBgzjRrjll6S5y4nGsAMkCESeH1sESNnbnNN-Yjoa8Z7L0tPWZkRyiej04r12GXtBHbYrQD0GwmwFtHj18j3YlLMfZlzIg50QTPc-UN65Dy6DOQMg-b3F46t7SLTvb732PgFAKvcofRyfFHvmZ__A5U_bEtTBoRtqUwaw09E6enthMIPZpgp5UDY_FtZ51wuvS9E5Go-4tkx2X62gdX9AceNuqdLbCtRIVHRGzXgK7jP9zTJvN1qYuGewyO2ocGCyHdHx8UUKTlYESr2xo2lpkRkJJpr2p1SnLvVNw7_HpMU4QfEzLDmZecYvZ24cBZAoj_HVfB7UnqLlfyLiRGGU592w3xwx0gAGir6lQbxKcnCSnKIDx9GUSmrjuR8DYZtedUP6TD894Lft5GiDahboMLb5pVyxXwOK6aHFAHNP9XDpPWAD6QY-bO-mAVIUqMQ%3D%3D9", "p=3cTMBiVxDAfc%3DeYMRZIJw4FH0NtWEkgJs0ejE5zBStiMzs4YSlEKO0YxsOwFzAPNtXJ89cR1kRhq2Tun928bn_oLXMnhieaGYJmfLy9ydgLgt5sMtLTB-EziOe_nR36IO8EZlY0NATy-CDjCJthXGjCTpKAlPhHEuLJ8a4a-6v1gm1J5XQg5UGUqygppleV1ES8gOyXhOD1AQrrjHZzs1WVotMaHnRdMzDiH3fPW_UF4jnoyj3NlVmDGLG8rMzPwel3sjxMuBNCZYnYy_iOvXo8MAT-6meQf0IoPBp7pJD0wqs61-9fsui46ZPKSGYguDITMQBpLVQGgtiQS8ifUv4zO56wwM4xmnQXYYkQsPSEu_AfOLQfdarmksX78nLcQUTAUBXYvAaVcRCnYv68PzVuDh4QWQNgWkwzWRtotHRtBT2eqgwITZIrHkvc94zJrk9dg1qIlqwYKx9PXPW0U7ul7jCTFYfPWJQIk_NxyLZRV0115ImeCBM5YamV-_BabZ8zkCknAHgQL6nV7_aUi60vlcOqACCJ4FoDWP4-cdg8Fp4FT20DObCsv4F6Fu4rvWsiACHEPu0mZRYHf01KAKD4WJZ88Pc2176B9IPxh5PHOd4KqStq61P6RDJsWS7fp8TOEgn5Ody4CDp6oPNNHZK62xnJder8EWDuY-rbJNTWtvJTlK3z7P_ji3cC92aksWFckjmKi_6fKef4zdS2Gc8BJt-pFYOyY2XS5nhnL5zMJ3vmSjCk13Pl1Xt7qOazw7ioM-Lr8gQ--N7NSs0LEnNe2e07nu1iui80tvrUm7X38IucWxWlDP3CAkll-PcLb_71EH3jlEoiEZQvLECx-NG2IWIsdYiF44pCNktAcMpMfZkDglAjPuDna-BCU_3xGLRsbrM9NLTkzHdCK1n2eIOTyvk3ColjX9OR3TauhjrLwx5JXe0KTxbRZkr3W-tr3WfZHJ5NS6GGLATOEIITFJxx9ZfMsLcw7DoyY_XZbWbHB-U7lU2Sfvo4X19Gs86jPMO_fZfOviTvprg2koh_YvNYAFhqzsmvi2FRDlVYt27E8UxqBrYA2QBj9Dhmd1ue4vImunftSCRGwVrpKJi3vciIzb4jUOT-oCN76qOZ2YMEd6kC-mBgVpahmlt1tZLPe4pj_-k7PhFBc2W-k_sE_PUtxqUF6G8Q9AYngqLPvZvRj0ykH-0Kjp2eAkmne7MBR8KosVYT9PEGL9yfYw9AVCY_RAZoyJLjqc4jZCE3xwo4PE8Vc-oqQKYGOCSBkw3lc-EoLKXXZGhb5PlQctnUfuwdkmbRGZ26gQeTsH2whGZBL4aNmmtZaleo8vijYa_BtySet_xSfFe-tJZq7OixEUFI6g_fb6FD6RNbYe3mF2jBMA8n2ksVC8GtmFMNFxUXktRieqQaeyvg4GMDKCako8EWry47W0tGXORUo3EAErHXBFA2xGOiB6rKx75_wMBexZrg%3D%3DO", "p=pUJybc31G2V0%3DUiVImOW0NxgHxY6TZ0me3WBplEX2kK6ARh3Wcs5Z6YN8CyEl_D54EwT96bYbNNifVtpS46KLLlSz_q5Ld2uJsTR7DoqkLJBdm52Ri_wZixrfJvkPlWjNiCI_u-v5RVDXrGcTVT-D50o_H4QS5TPxvboxHU_kC2upRTxToHxHbU9sn8xqeEHREAsjCLp5lRS0xPy1jYr3k6bnX0C5NTqZRb45rSgnhICdUzVh7_7tAnyd2RcuACF12HJ_Hz9YJA1pgpCaT1CwO5j4AE3JhnnTuKOXx323kKFtglFX0yBvXLslmH387E2D6K2uD0c2XRQ9GRmK4N7OFUY0oM54sDyXUHemTaccvYE2p8j3ZwN3fee_snESeA95hHF1g9Gn69GF2CLr79C-xn1TOA8FloB2aAnlT8CS-WDA0Ql2hDb6lFIPeBCw-SloMsnSXpIFxc-jr_040qpDN1JbjmaAc2I8v6NeLkXVoDfEFpJm-fk1zSAUNvbqwjF42rbh9BEkiPJzG8pH8K6FnSghbvITX0i6UEBCm8ZwcDvAKPik-KT-gRZFFYM90M5N2Hw2k_LnOXvmrBOxFtbmGPd41tsS39YWj35tUi-1Gaanq1RvNFcTeBVpXiSShSUF_9Gvz7VYi_O_jXVDeJcS_ZApIJ1FrDxzKRt6ZrEznhUH1Q0rzyGiIqUQueTr32uONjuLaHeq11o5KpSplt345PZaKkhHMido_2vxT5ROjvKpc0EseTqrCyWFsOO1QJEJndiojoV7zyhd79nn_l-MvfRBC0zXciEP2HjO6WoUpH2ME682DMuw-uSsRmRNeOPPEG_gWy-ue5a0ti013Fs9VdnFtPVPz7q5Bxh_deMCrDZJB5ScD-VUPwgodLeSxYWrJcztyVmO9JUmgmqzdnC_ftCba-FRpmAUTlyfrxyTqlw2gaLBZNFqYHcevcqAlALClOatE4o0kfyjTpgUK5KjuKYebinCY7cXKVOVFa6oRgkwJxJSkUwbUM9K6h0S5LyYGFSJ2_eScpnPXclFmK2Y6zYxwligkFn8H04wUCR-aEH281AUxGewTOyOXLwt1p0AvQl9QFR_w9C7pA3N7fAeu7LqRutQKIo0gSRIDq_fs3VBGRT8V-8-F8yor8G7EyeS7Ml5w4VI8oOgcdHpT3Cn38puDy8YTjGtR5F_xR1XepGh57yEQHjkHE98OaLDsmxs0yvIH7NBFHO_C5hIkY-fyWBfpoogWHIf4xKb2QzXOrbBjVeS2ShkEI7OCgwmFTLW3vnRc0u0lRX0TWSYJv5BRpukxy5xOwYp6IuRN9j4XxDX8WF0jkcU4Q3zl5VJHy4PLdH3ENiI92ggOuEIIwEa87X4ONJ-xUJPwHGudGuqhJcLsjYvCWLfuW2Hqsy_-Ah55jcbNfkuusY3I3gzae5_xvBvmokhV5vfDPPsidl0u3A179hjzGU8bMfi4MYIenOKAg%3D%3DgU", "p=HUJybc31G2V0%3DUiVImOW0NxgHxY6TZ0me3WBplEX2kK6ARh3Wcs5Z6YN8CyEl_D54EwT96bYbNNifVtpS46KLLlSz_q5Ld2uJsTR7DoqkLJBdm52Ri_wZixrfJvkPlWjNiCI_u-v5RVDXrGcTVT-D50o_H4QS5TPxvboxHU_kC2upRTxToHxHbU9sn8xqeEHREAsjCLp5lRS0xPy1jYr3k6bnX0C5NTqZRb45rSgnhICdUzVh7_7tAnyd2RcuACF12HJ_Hz9YJA1pgpCaT1CwO5j4AE3JhnnTuKOXx323kKFtglFX0yBvXLslmH387E2D6K2uD0c2XRQ9GRmK4N7OFUY0oM54sDyXUHemTaccvYE2p8j3ZwN3fee_snESeA95hHF1g9Gn69GF2CLr79C-xn1TOA8FloB2aAnlT8CS-WDA0Ql2hDb6lFIPeBCw-SloMsnSXpIFxc-jr_040qpDN1JbjmaAc2I8v6NeLkXVoDfEFpJm-fk1zSAUNvbqwjF42rbh9BEkiPJzG8pH8K6FnSghbvITX0i6UEBCm8ZwcDvAKPik-KT-gRZFFYM90M5N2Hw2k_LnOXvmrBOxFtbmGPd41tsS39YWj35tUi-1Gaanq1RvNFcTeBVpXiSShSUF_9Gvz7VYi_O_jXVDeJcS_ZApIJ1FrDxzKRt6ZrEznhUH1Q0rzyGiIqUQueTr32uONjuLaHeq11o5KpSplt345PZaKkhHMido_2vxT5ROjvKpc0EseTqrCyWFsOO1QJEJndiojoV7zyhd79nn_l-MvfR7DY2lGhTKJ3y80tER9D3OAIBCexL4a_hHQXv--06dlPjoVfaiWxr08SlHz9ZtSMAaynBcReF9mWEK-ZYaDVDlWdhC2cftE8uBmbiXA5tGRzcC_pFP1IoiOryJVHcdw7m-_Im7QfUo9PZOY6KPrNKKj6akXPgz3BAb84haE_ssDKxf9_TPrvt_4ssbQDL37zp_9n2eNb74kQTui1YwMXVDeQTZ1xTq7EUmoWcukOJKJGAAcJ5tT69babCwZcO_kdJOhZAqoV9TunoDd8k2MmScK-OQBQmbgFxxtswA9juK7MZfKQffnnPvCkCtIw6C6IBJJbgpgiy6KaiSmrbWjxZszCkTPRTTT9JXboKrtcKOZQa7c2h1ZLLP8ShSTiNMmo3c-zwgihYdlMn1TSx7iiM1HCD2JX9MjRT2h7n7XuPkQBnuYfIt87g_ulnq2VLawwCHCUpSY3G-qBce2skKKOpOv7cALdgPVCPRim-bCyydBbyfeNbSSkLWQ0SZrIiakyP1yh4qHRNIrz6qmHrFQy8MALONFLHrRsmbFirsphOxf9iuIyIdzKJ5mDl_GZKz3UWFKWP0OUGGHAOV-t8uUS64J6iFqPoiT5Xm-Cm2sOmuws7T4Lj50lCO7kEOVG3zq5M20xNfsPtN3KdZw5Q-4HLGGtSnkux6VGhUPUAgZ8MR4w%3D%3Da4", "p=lYdVi_XPUOzA%3D7ioCfKCMWbJ5I58eSuM3lc9njhOZrSvb2XZgR5FHpHZjAGPgVVSPqgQkceB5RTG63NgAKuSzdJ3v5rOu5vSJ0nE77V8WgE0RqQvnkn5nVc9MxIVdXrelLRz7WeAjcVjKW5KIvgFQ0owmMCLIUm97sStHvLY6ZCjf27UMEr_cz9nXHzZZmkGW7nzMcPVHdqIV7lukoSweLm_xqvNxsCAGV41udxUidkLhqKHX9ZGbjrv8rbLr6mM5MQWzlxaaQY4v9d4gn08B8WYaX0Yn0pnGnDbSp91CAtdo1_C5XjGfeF-cXuaqhL484xwnu01M6Wh8BAvVFhutoaf5xBKSK95cxwU385XdyT8t11X9UVnGgh2S4xwIZ9OA1Z0HXWhWkubw3cFTcCB3batk7VRKrYmhA6Qix96yOzNQqcfj4sn5uevgWtwLZ8S-_NZcMWnMW21jF6I0217jC4ManNdAruiK6OJygdNpXjR7qKqF4-CfLJ_gvRjLeof0t51fWU2MOKd5bW0ssB4hyxZR1vkZoiIjj9NtPhPEeMUPP5NWnxaPmvrdAzrl-KIOWoPbIaywq186nA40e-EXoytF5McoWbWFoAVFLqJEX95KikLAYhFJmmjSFlmQL-BFLV3tNPtqNLSe8wbRa7DVfNaZHBaIAhDpdpa211oxl1xUG7Mdhf_bM4TTL_aGYnS4iKJYWuK6AYbnqaNtx8noR83MpokvFOkqCj47cIwDf4IR8hOIcPAmhT-Yf4IznYWXojhgtrLKPKrZtrnhSt1bWn5YCjcFYO8sd8fX6WfMsmH5T7IvHlaQa5eJdsOLobV_f1yXs0vFvdhVv0VOaOXf74h7LjiQsIZbUd4rQLO1Cx8oAY6M50LpIuBjDfwxrztNiT1Rftw3VCa-6Ewf76qSaX1Yu5ydoem72Jp9zsOpH-j-T9pdD-1meMgB3JRlNjjGz-a9x1V5iceCezlQi2cbX3a14Sw3Wkr4csBa4_5Stcr_yIn68OR03lo-69ZpejQxR6B36gr9FVnU14goGKGPN7bt820Y9Cps23KeSpfsRsMVtsdHzveO7y4yq56XtsPkzQZADAuNd5TBslfNvDwETwQYsMV4hVoS5wx85lbU9KJty84NQeRHzDKwUTDtuh6rHIvqiNKGamWl_C1WNv7-clRg87d77D4RzVUTExHfn15lVDPV0_7-YITemAD-fMX0Jb5zE7JAUYTo_l2cHGd-Qf4-M0FCrYQ7-kb0aSs5AGGpjP7nl4ldT1e8aDTAGxECAgEbfolrbOy7pqu75JPDdNJXR_kQDO7-rdNfuDEXXlUixixMYbKtfhJs0TuiUWSS-udK0mpJCOGLPvfMtnC319yzFejb2Beoepd98gRfW3oqg1nD5-BTXo37Fvcu66oo--cES8tVDbeJWtHnoIitIdWBr-2pI5__gtLM_vdEAqzKZGsZoh184vPia1mQhbX28g%3D%3D2K", "p=BYFg4QJ5A6eY%3DVpUK7bR_CQ7W5CjZ3Hju8eEVgudtknCeATYWKtR1Q2tQJpa9rNzBMS6jdLvHNuc0VkROt442tEYh4vzrSvW8cHN3uYCPhmhne30PMgrJda7CUiHmdSuergcxVq7ciZ9fQvVsD3hrKJZHzFgdoYYcCKtuB-Kn4DbcRFFCy-lgfMiz8SDZi2RqfUrPPvbi7WhphTsupV-u77huN_0rZ0Gvi7Luc1ZMpYQAfyjkKNiBpvurY7cEa2GkW-vH74qxFf-PVOos5XJHaN8NV_r2ndGId2lMUGn6DeiCFfg3ZbcodnORNYPixhoxePjy8JPDO_bOSOGYH6giXhLqArB98kRhT8wkZRgc828OdWZFd0XixhNHonYbNHskfZOMLyRfC50wjhh9WdVKNxL0KwjYkq09IN-RqXZ39OzUP5lXJipq0ot02GlbQ6o_ZkIEbicaZ9yrjMUOoBtchL5nf-KU6iGfoU0cVP9tXUMS5dsteBtUMPLQJai9ORPPjtxkCPMwQOWAEFq7cDdtjysDSjXJX2HTTn1QswuR37Y5soo_DfNPprZD4WFBeRdbx3ut2eROPMwQKXiRBWI-PDi_zhkD9sKUU1HprNjhQlmgtor7en8aHNfN1PQcZcdesFu3Bd40m4pYXX5g7J8uwIZBUZsTMr5V77QRODdOddoc0VqbMUP1FeOT8vqLpPvnZRHVhqqwuQVqxaCzJBMUQWAr5RArqiAjH2eYneDIgz6KAixkk0D_Ye58jYfPYhi9gpUhQq-Jzmi-uyO8P5oAO_WDdQ5iGTfw8Cm5YA-H9SZBnvLK7xVlUccgrDQkXakganIB4WSpnyxYboUJrKIy3l48XUZ1OAhcI8Ze6TMys1rjsPA25LAafhzE3mS1FJsxANG-1Qh2DIWRTfb1gGRsIn3KSn7HyMY7hKgx8WTmSZ6QS5lJbTmzFa2kJjdxaYm8Vw1f_ByJa_ABkijgPqJ5Yhbbh9RcH0dSSxxAmwxCy3kqyDkFDNp8RKYOw2iIuz1TwT7-wErqI2P3PfYgdFWjW006P8ZFgCUjFO3vzEcUuDeBvIswV5OyKYpWZ5gEF7Cl-DhmtJQfcHi98P_OaHIEebpb2aTDFbBC9KBuNsUtqM_Tbj3rEcrCxbYkj4hHEbxRtDs0FHmrcFPOv7KZbelGW3hN7H2xSVV-tbx0maSdAVvmfUN4N2UEs1hu0Mm6NtJU87hR3A0pUN35fwRAvptJfZf_TQERE7irJ-t8-YaoMxzv-G7xTm8dWCmq6sp36IExuYhuYiTq6qFt23pNM5dZ0KdBiy9YPKzL-6pohqolN7jOgsfcqBGERIXaaYsGNz9IyShHkVoDGNo6sx4ZsQqynjq7vwKWz6ZYtgcqSE_Mw8yrjAEh-RyMe5Pe0LyHYly7NY6VEuX7huBn39YHZ2TrlRD3oQFRtAQce0zrc86tBfMix8t0cwS5MW5TA26uriJYJQ%3D%3D", "p=swNMsLAQgw3E%3Dh0-6Jj8on7avVvQnD4cEWTqxCrIgfm0-jtiq5rHdysQRN6XaeOQOH-VbhPVLJm9svxnVAAIubo_k2vzwYy1JrTCdpiopwxG61wvBDNejx2AbmQS9PIdbTPZ2eY11VwvIdzWWtZUMGwCByuJGMVN5B1ErdsK4VsWM2O_qkza0BSSBWpPXWWSkE4IowbUbGjB3D-VKSD9GLvsxxiJJL3cqE26-V_kkWOcv4v-nZL3g0SOd8jVyai6NDcHQrtScxX8mU7hmwCopTIv_7C_H0X3I_M27O2R8PiUln84M8J7ENCKxxP2L1U_rdRX1-f7u7ykCA7O-Td2FLPL5sl5610yfwFVfZjdLkKbfyDYvzkJejZAkeB8rJTbiEF002g3azdw0zOmaHfGw2dn8TyWWP_dUyEPil_CQucsos2zoQVWziEMXUPSQ5bzpjchmuZX4mkyOCh96toiAPTI-36hHGPrnz40i3z1TYmjQEGgc_jumv-EMyD95U0sC_8Eay-gmr2rvAs8ODu7L3xgS4sZwIp8uKmw9KvinEX610aI-738MrwjlS2kWOUWdRIfTGwdMzmNKSAvD30UvNYxHGhuVYoAnYtCF27Q7hXWNsIO0zWDNzS2C-G9aW5NHpCS6RDDHi1AX8OgRk--1uQt0lG3koURfZ4f4iSTYjQQhUHIcYbwwTX6lxzhXuzWLevlLy_vdii8YfVZuQy_-Oys3FIENKCIGWb631zhkXH4ZcVZjhTKUwzvwNiO96XgbLKHX4knZH6HR_LLljaugD5Egr8tZTjnO23EjTzPxCEBxyg-zT_fUEE-uiDR1rZeoH9kLNRnSywqr0P62mhnM76FS57lzPL2wSU1pHtHWURPC6iDWV5T_9iD6anAdcw0CwSoe4jOsVNCfWU34vhjlFzlOwrRXvCXLVLt6yzEpbNjk7H5xEpjGXceS43fx1aqfaPNRU3Zg46QKRtmuL950Syhd6kLxHJJVysua1tTi92XhwIOHUTl1gOUC3fi9B7eugBsDyW2mzwGagO2i9UznUW9SvekuhKZrwfJ35KxtDcKA33SOcqu8fRbAAb0hjasNKGKklZzK2CqP7Ih6sqkwU2RWTwZZH4c0nG8fOmRS8iMNok7ItzwAYemJZ71-HpiDVuBz4qAi9MLlb6Lz69-iY5dl-6XOiWiAM4lngErOZOBydgZRlFOPBKg0ivbNDclzg2zUdqD6LnehKj0naMhLmvjmMN4u7A8qCjuReHoWcI7NgTo_KUGS6F1gFm8T1gD9ABtY6qEYwBvqQ1UyFZShNgwKjqMgqnnHjmqObfT3oi3iAhbBI4FyiT0S3YM5KHE4M0BG7R0aXCvxbP93B0kBnaDSUW7tNvlf__UykvtMnHGknzsZHg6hicZnCf9HSGbiluSdsoNx9FAaxJhzkYXtYscVgupWaClvqmRfqejIy6id2SJGkfSjmwciMtHcKze1cA%3D%3DqI", "p=dCWwRj3eGxCw%3DOY4T2_YuUnfMV_DVMms3dy-7E68zUruwOuq80MZh2z7wzxaSQTdW366z3bx-AmivWumxRqrXHwVFopOuSnhImOE1ZRiPWSwVte3S5-gv94OoUE7-hHdFx5XGvObl3GsZ1s62eD0xcecYYlgpUhScxLeQIYzSxQM3UprBx71e9WFvhPwiPMlChQ63Tcowzra5zhmhHFgFsvUzyM-Pu1d-grW_VJvvNyvT-Grs9EwEgDf1Qq_clopkN7f4qS-irfDvvpMFb2Q5mROHlcqQUrnGJYqFahD9GOT5MYe9jgzDnvVBQ6S6TKTPpjaIejbB--YWgXYpRpH7ETiLOr_c2GwJB7BpGCBkregXU42kjCEhypbMNP8561jwEtPOoonNFvg_5487lGUjo1YZ2RznlxRsktOUFYc2S4QLxnQ1OngIVQnCpIPDmcT-cm4sw6VI2vC8hrsKS4t59gXL1HMp1mEF6H2_Uf_rMEDPpFWl1yePus_O0wVTHC_uqM-3HGZFDrx2kF46u1x0-zTy5MXruYPoNuuQbbsHLk5z2w6PAGBpKi7aiRb_z_3t64-43eZYq5swmCYS4q8hbjx5FPVklDBftcfpsRtz_Hdr0JqygEdBXfQoWxbIHPcdZO0Bq_vHIhiACC938Lkc38mcWdYY-kUBThEjRJsIlZtbyaOb_TBkVgsEzJ9jUtJfvndQXyEQQBn8bQnleebALVEOtHXcpwFusMzOXQQKcaJaHfBhWupuDw_ICQqwWEkJNs4_Zd9_FWgfHsE5ykq7Gasnu7HKgCdx6Rjs4k5YKSDdNypP_QQHsxml-PvXVqThr50Wqb4wHIPmProD5XIaZW_k642Y6hPI4DeWVc8l65HgFcIqbow8NKHH86KuRvEVqsjhuDuj1vQZzxVDPHsWEXp0EQ7KscEWaLqSEOzgbf0nx9o4nYY4ZsiGnDihuM4YGCCzZHwDFlxRhHZtAfD30c-BftwgIE9ItgKCMy9xD13nmI3uPibmakXvIol23Y1aSx7nWgRU8JFXkVA0J3Mbcr0POHrtI-8vAjFX8I6ID76d9wAZ8BCJT-O-NnZGZ0pPKKSTgCpv7gkDl_Cf_uqU8IVIQd89VsDScZFarDXxfwjp34bCZoV-Npu-CybhK3Pj4wcksxRxjnGqfBbuuVGvU28OBf-l7J9pgXovUD_mtGnYvLXuS81tnpGL0Xur2Wb_jVyAxq6K2Ln6xY25pDX25AtPaniRgvb7ompiZv6Yqn_RQ1Rc2EyYG93_1cUFg8gnaOFGhQLgUmvszQ3JXvwph7X9RejdV_hJEbq92Pm2ld8dauzs6Vi9P6EVDu9VTFXt8yKhblsZAxR6yomF5IElN3lyAZwMVunvHfWpBZ1w4mSDuMsQbwV4Oh0i1sg9oEZZLdlRriGLS45TDUVXVcG8xT2R81iHQJM3yZbH4uip_OMDfbKT4Vh0eZ2vn47mhdP1Wg%3D%3D", "p=Y2JgR8oZr6IU%3D3jJeRBx8_TqMKODKaSpA_eqZR1q9bNtsssU1yfodc1eDKseMMzXDNymoLyKjDQLg0KufwDiHw4o9QUsX-uaNJOoTpNqwloOjc35--Y6dW42EWbSK8jKi60L631au8PrPky-sJRgFJ1pt4BAJ3wXXy38AiQLRS5Anq6LZWu4-rNnFhjA5Z9dkAUU6BDS1fFGQ7CTcpFPAgD40hzWxcEDsfMkAIHTYkJkX2WVoG2jNcHejCSAxaa0HSJOUoBhB_M15f0GuFmxLSeSR0ItlyHrpOkfmoBqMRDoCjEQtHIxbx8YXzEeMPV3MH5xHZRxbj3ibgfIQfv6l7RpfgJ-aDJ-rk8iyTcK9Ms6H0Iohbob55XivrLcqzlThUCw9KTZ3RZud-VAtCTKxQDjITdzZAt-zBMmH0xCbRsl_rIbd2EeNvhviTYX8dRRkurURB0bdh20ZpjAqwohNlbI83zrZk_PfLnd1KRw78qKW8nCJk8gkAl9Ot78J-QA_PGHygI0nDAR2tNWtmUgAo05R89HR0g8VYQJuGhqWd1JuhMcaziMDK3SUVnClYrSuzYlTzyPcnom-ZTc_F8gHVrYSIU1PNYrgWNtKDpIzcm0Lbyb7O-IGsA_009masX95EON3Ec7dIkVtyRzTyGqRI203ksSZtINldvMxsYWW0dTnBMLuaHNMFuvpSIMZiLF0bXo12wnI3I8ieK3kqLaHr0MPxZpCYIzIE_jfvn54jzAl_lOruTsLqm9eRa_ICowKJNdNu7tA4dJ4XNaha-u_3xWc7vE97osDxrThGs9Tf163NnQTSj4N4B41XJuAN2P9YvH9vF0Z4AKKSLjJtcyT6c7t2l9Wj29iXkWyGXwL062aXJpTia5aU772cotWI1z8FwY0Mw71CnHARErdC7IrmDM-Wbm_KT_Raa-O5JTn_eZYh3ayK71IKI7-NMPTHmf5I04T1-j4LhqzPQH4OK56XF_4zXu-izRY9WTFYyMGGhOcsScsLtxDYeOW9w6_c4t7nAPnDTjPz68l_rh7lp2X-5mwoSesF_CKH5ICYZ53muliRYmVk99l7qzwQFOEG9qkGC6nyadKNZuxdGX0lGmOe_KJPC0WQJAaveLesGr7oSh2d6r0KONgZrZSbn7nElgjTnPTFuzrslHjVlE4olxwej1E2G6qz1jGX4cdkbGJQIhVOFINElh0n-wxMO7zvh2QbG73arstjM5aRvRZZRhBnM7tVJVRmEoOKSEeda0hSgHK5fbauAlEYRFqgnKTPAvNiO6RWyTNzwp3nwxlJfyVQgtxXVREB_WPICepjaXzPWXiAw_HtNVQEM-BzgHsSmvN34vRwCIKmcx7wQ2pAsLtbdPp85HFxwARvHCD_CzNpCFj7ToQcDrEqo9SWEUQJnUMSmexMxDM3NYZJ_tZ9An1UmZDemY8Tqt2taYi-anQVad8VP6WDi_KQU0xc0AwIajbGA%3D%3D", "p=gXPkPrW1Kghg%3DEfRWZwWkN8jjFqqFusdvroW4aOHJO1LUezCajo6W7oGa49gUCYPeJFtwTKQArjhoBQYmxeBti8nW-7hWoJilpCdk5PPI65O3X1Ry9np3pmBhfMiDcaZ__pjNecp_oxZOqvs1boaEs5kj1Npd7Bj15CWWyshqtFWPWOTB0pZdGqEtkiajPMG0AekiG9lIGSYp8oKY0bQ9Y-jqCa1yeyCs8fD8DTtaFwN-K_idJSj-Fvp5dCn8iif6oRCTZQOCn0PUJIuvE3fSokBLZnMkXa-mdvluqCUYaHO-1AWwJLqs4t4gxs0ToEuv-bk_hW7A6Dh9HZdgKXt9Zo7lGFafWAHDrNCMNfatMStQsjhjDwKzEOK9aSWZAkorb7edyTlQPKE5GpYQuP2zfN014HyVGth6rwO807SlOx3mpgdMvmYGOlBgIO0MoM2QsVY_14KeT_jMjA1zBTpB2A3xriKb8OQsrH99DZ2YjUdQLPPc3m1eZUkCwjm8iSf-FgmtPeymeiljMeSIEDzK0Ey3KadxW5jlS9lGR89_7RgYpbX5W6Fp4P93j-GPB2-fcAqobYqVNRT9wVgVVcA1wFnCaveulpAst9N5-lXHsZNAeN2YX3nfNw2JwcKldttYdmsCO-ubYue-vNw2TSEE7TsC0fxFDwSWvpQ9psT9ktGHm4yXYf1ylwpqDNsA21UYwYTsmSMJgX4eiK7E3iQyi8oCz_3WBxDInpWRHEhqVqcbkmqDx2g9Ds6de4E9kQ6EW9XuaVDpPqglJpe54sASdQ7i-b5rUg3R3tdSZyWYWWk7WcQd9LRnVJEt5C3CoGxwVqWdPouckwyhM_e1U0fzex71HrCoWzwT92MR--42Z3YI4z2HQzmImuwxjvL5DEc8YHUjYMncKCkx5Y9zKAMQTk07SUDpoa8pH1Ao-vsPfOSWgoiJcf1xx6kmLO8eKc0_xu9QdXkKP_FMXpm_IX60Nw1nxpIZDcr4A481jSFC_DvzdJ9LYeoBoGffhOWvQuAjf6969-TnsVWnxPGUvw_8lV-bP0UE0FjawyU58CO3JFiLB2Ktd_XMNQ3aL_sGIZDJExGg2zlN9wvsGjDAPuxTlN-F3bpVipGahwm0n5k8r3pwfbNu595VqbzHNyCTB5IR8CRHo1nsoGv-I02pUo2hGLjTdtkORcKxb9VBGY1i56RdCS8igu-lKjWMD_JyOKftB97kmlDDBD0gxYAbHLzsnvOIEm7Pdl34HYukohsoB0vvhKvN8nX-CU-z6jVrGGDRvHRBElqxeVIJANMv_JSYgOqlwIXBgEOcfaytMwrx1T93DZ7IgkOhjxWJTt1sWTcgd8nRyc2eNol0fQCVcNEXyF4id4fwUoUvZ3tMi2kCzYY00aZr1PUmjzEjeLaFU_Mdbp1fue5Dqfijr_B7575lyhzMJ2LDbUhp5exCKozmCHnadt9jTxJuowoOqGHrWJNznw%3D%3D", "p=jYFg4QJ5A6eY%3DVpUK7bR_CQ7W5CjZ3Hju8eEVgudtknCeATYWKtR1Q2tQJpa9rNzBMS6jdLvHNuc0VkROt442tEYh4vzrSvW8cHN3uYCPhmhne30PMgrJda7CUiHmdSuergcxVq7ciZ9fQvVsD3hrKJZHzFgdoYYcCKtuB-Kn4DbcRFFCy-lgfMiz8SDZi2RqfUrPPvbi7WhphTsupV-u77huN_0rZ0Gvi7Luc1ZMpYQAfyjkKNiBpvurY7cEa2GkW-vH74qxFf-PVOos5XJHaN8NV_r2ndGId2lMUGn6DeiCFfg3ZbcodnORNYPixhoxePjy8JPDO_bOSOGYH6giXhLqArB98kRhT8wkZRgc828OdWZFd0XixhNHonYbNHskfZOMLyRfC50wjhh9WdVKNxL0KwjYkq09IN-RqXZ39OzUP5lXJipq0ot02GlbQ6o_ZkIEbicaZ9yrjMUOoBtchL5nf-KU6iGfoU0cVP9tXUMS5dsteBtUMPLQJai9ORPPjtxkCPMwQOWAEFq7cDdtjysDSjXJX2HTTn1QswuR37Y5soo_DfNPprZD4WFBeRdbx3ut2eROPMwQKXiRBWI-PDi_zhkD9sKUU1HprNjhQlmgtor7en8aHNfN1PQcZcdesFu3Bd40m4pYXX5g7J8uwIZBUZsTMr5V77QRODdOddoc0VqbMUP1FeOT8vqLpPvnZRHVhqqwuQVqxaCzJBMUQWAr5RArqiAjH2eYneDIgz6KAixkk0D_Ye58jYfPYhi9gpUhQq-Jzmi-uyO8P5oAO_VdV34KNYA4hvUrVJkR3i-8Brp7q11YrjDaBZaXS05nG_X5F0PNLBlmHbx9POhSjGLS-trvEH1qjF-eO1fANjU2JXxLAfUJG6vXkvRjTMpA5JQ1dIU9lk89t3X6J2D_sXXRG1GpqI9NfES068j5O-1Y27Z-2iFNu9gi6bxeWc9h2YWMv7DOPB60aVx6p0aVckv2ozRk4B6Ec4E_btaR4VhdKPLVdkycoMoIR45YZgJLZM0uL0ATe1r-8XK6PS6Q486cwJrZidvuEP8nE6AQJhjcsIonL2yxLo0MoG2_UvTFZuFX2kbnn1BqeYb6UHuhU_D3HEQRF137hJ5Ol7YdzMNAb9Ibzyna44xqCA3kvXIfooBEqYJjKWMU_Fgcbj-pERnKivs5UumtHuvPT_lnD1Xx37OMDP5D5XgJIL2K4EXvwVZzucMlrHx6aqhbuj39FnXy2hi66KIw7sMVk4lo0rtf82ytXcCIr96NCo_-x4B92iKuwCAoiOgcVJVfTHz3MT4x3ZuPQAIFCDZ4zS4lX8x7gIk_FInKAY1j6brdknmjvbJbOy2HjIyHmwuXQ_SzRKENXIAiz3GDXEmSH3FUMWgfyAtFB3a07QPhUTgQh5OBmyHQ17GplQ7S2t4AbET3tmRRv9a_ICMc87XDsS9kJD5GY2gGDVMwYb3SvD3gF9OXjw%3D%3D"];
let gainscore = 0, lookscore = 0;
let StartBody = [],LookBody = [];
let startbodys = $.getdata('youth_start');
let lookbodys = $.getdata('youth_look')

if (isGetCookie = typeof $request !==`undefined`) {
   GetCookie();
   $.done()
} 
if (!$.isNode() && !lookbodys) {
    $.msg($.name, "您未获取看看赚请求，请先获取");
} else if (!$.isNode() && !startbodys) {
    $.msg($.name, "您未获取浏览赚请求，请先获取");
}
if (!$.isNode() && !startbodys.indexOf("&") == -1) {
    startArr.push(startbodys)
} else if (!$.isNode() && !lookbodys.indexOf("&") == -1) {
    lookArr.push(lookbodys)
} else {
    if (!$.isNode() && !startbodys.indexOf("&") > -1) {
        StartBody = startbodys.split('&');
    }
    if (!$.isNode() && !lookbodys.indexOf("&") > -1) {
        LookBody = lookbodys.split('&');
    }
    if ($.isNode()) {
        if (process.env.YOUTH_START && process.env.YOUTH_START.indexOf('&') > -1) {
            StartBody = process.env.YOUTH_START.split('&');
        } else {
            StartBody = [process.env.YOUTH_START]
        };
        if (process.env.YOUTH_LOOK && process.env.YOUTH_LOOK.indexOf('&') > -1) {
            LookBody = process.env.YOUTH_LOOK.split('&');
        } else {
            LookBody = [process.env.YOUTH_LOOK]
        }
    }
    Object.keys(StartBody).forEach((item) => {
        if (StartBody[item]) {
            startArr.push(StartBody[item])
        }
    });
    Object.keys(LookBody).forEach((item) => {
        if (LookBody[item]) {
            lookArr.push(LookBody[item])
        }
    })
}
timeZone = new Date().getTimezoneOffset() / 60;
timestamp = Date.now() + (8 + timeZone) * 60 * 60 * 1000;
bjTime = new Date(timestamp).toLocaleString('zh', {
    hour12: false,
    timeZoneName: 'long'
});
console.log(`\n === 脚本执行 ${bjTime} ===\n`);
!(async() => {
    $.log(`您共提供${startArr.length}次浏览赚任务`)
    if (startArr.length !== 0) {
        for (let i = 0; i < startArr.length; i++) {
            if (startArr[i]) {
                gainbody = startArr[i];
                $.index = i + 1;
                $.log(`-------------------------\n\n开始中青看点浏览赚第${$.index}次任务`)
            }
            await GainStart();
        }
        console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${gainscore}个青豆，浏览赚任务全部结束`);
        //$.msg("中青看点浏览赚", `共完成${$.index}次任务`+`  共计获得${gainscore}个青豆`);
    }
    $.log(`\n~~~~~~~~~~~~~~~~~~~~~~~~~~~~\n\n您共提供${lookArr.length}次看看赚任务\n`)
    if (lookArr.length !== 0) {
        for (let k = 0; k < lookArr.length; k++) {
            if (lookArr[k]) {
                lookbody = lookArr[k];
                $.index = k + 1;
                $.log(`-------------------------\n\n开始中青看点看看赚第${$.index}次任务`)
            }
            await lookStart();
        }
        console.log(`-------------------------\n\n中青看点共完成${$.index}次任务，共计获得${lookscore}个青豆，看看赚任务全部结束`);
        $.msg("中青看点看看赚", '共完成' + (lookArr.length + startArr.length) + '次任务，共计获得' + parseInt(lookscore + gainscore) + '个青豆');
    }
    if ($.isNode()) {
        //await notify.sendNotify($.name, `共完成${$.index}次任务，\n共计获得${gainscore}个青豆`)
    }
})()
    .catch((e) => $.logErr(e))
    .finally(() => $.done())

function GainStart() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('task/browse_start.json', gainbody), async(error, resp, data) => {
            let startres = JSON.parse(data);
            if (startres.success == false) {
                if(!$.isNode()) {
                    smbody = $.getdata('youth_start').replace(gainbody + "&", "");
                    $.setdata(smbody, 'youth_start');
                    $.log(startres.message + "已自动删除")
                }
            } else {
                comstate = startres.items.comtele_state;
                if (comstate == 0) {
                    $.log("任务开始，" + startres.items.banner_id + startres.message);
                    await $.wait(10000);
                    await GainEnd()
                } else if (comstate == 1) {
                    $.log("任务:" + startres.items.banner_id + "已完成，本次跳过");
                }
            }
            resolve()
        })
    })
}

function lookStart() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('nameless/adlickstart.json', lookbody), async(error, resp, data) => {
            startlk = JSON.parse(data);
            if (!$.isNode()&&startlk.success == false) {
                smbody = $.getdata('youth_look').replace(lookbody + "&", "");
                $.setdata(smbody, 'youth_look');
                $.log(startlk.message + "已自动删除")
            } else {
                comstate = startlk.items.comtele_state;
                if (comstate == 0) {
                    $.log("任务开始，" + startlk.items.banner_id + startlk.message);
                    for (let j = 0; j < startlk.items.see_num - startlk.items.read_num; j++) {
                        $.log("任务执行第" + parseInt(j + 1) + "次")
                        await $.wait(8000);
                        await lookstatus()
                    }
                    await $.wait(10000);
                    await lookEnd()
                } else if (comstate == 1) {
                    $.log("任务:" + startlk.items.banner_id + "已完成，本次跳过");
                }
            }
            resolve()
        })
    })
}

function GainEnd() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('task/browse_end.json', gainbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message + "，恭喜获得" + endres.items.score + "个青豆");
                gainscore += parseInt(endres.items.score)
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function lookstatus() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('nameless/bannerstatus.json', lookbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message);
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function lookEnd() {
    return new Promise((resolve, reject) => {
        $.post(gainHost('nameless/adlickend.json', lookbody), (error, resp, data) => {
            let endres = JSON.parse(data);
            if (endres.success == true) {
                $.log("任务" + endres.items.banner_id + endres.message + "，" + endres.items.desc)
                lookscore += parseInt(endres.items.score)
            } else {
                $.log(endres.message)
            }
            resolve()
        })
    })
}

function gainHost(api, body) {
    return {
        url: 'https://kandian.youth.cn/v5/' + api,
        headers: {
            'User-Agent': 'okhttp/3.12.2',
            'Host': 'kandian.youth.cn',
            'Content-Type': 'application/x-www-form-urlencoded',
            'device-platform': 'android'
        },
        body: body
    }
}


function GetCookie() {
    if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/browse_start\.json/)) {
        startbodyVal = $request.body;
        if (startbodys) {
            if (startbodys.indexOf(startbodyVal) > -1) {
                $.msg($.name, '阅读请求重复，本次跳过');
                return
            } else if (startbodys.indexOf(startbodyVal) == -1) {
                startbodys += "&" + startbodyVal
            }
        } else {
            startbodys = $request.body
        }
        $.setdata(startbodys, 'youth_start');
        $.log("获取浏览赚请求: " + startbodyVal);
        $.msg($.name, '获取浏览赚请求成功')
    } else if ($request && $request.method != 'OPTIONS' && $request.url.match(/\/adlickstart\.json/)) {
        seeVal = $request.body;
        if (lookbodys) {
            if (lookbodys.indexOf(seeVal) > -1) {
                $.msg($.name, '阅读请求重复，本次跳过');
                return
            } else if (lookbodys.indexOf(seeVal) == -1) {
                lookbodys += "&" + seeVal
                $.msg($.name, '获取看看赚请求' + lookbodys.split("&").length + '成功')
            }
        } else {
            lookbodys = $request.body
            $.msg($.name, '获取看看赚请求成功')
        }
        $.setdata(lookbodys, 'youth_look');
        $.log("获取浏览赚请求: " + seeVal)
    }
}

function Env(t,e){"undefined"!=typeof process&&JSON.stringify(process.env).indexOf("GITHUB")>-1&&process.exit(0);class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`\ud83d\udd14${this.name}, \u5f00\u59cb!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,h]=i.split("@"),a={url:`http://${h}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),h=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(h);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon()?(this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)})):this.isQuanX()?(this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t))):this.isNode()&&(this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)}))}post(t,e=(()=>{})){if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.post(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status),e(t,s,i)});else if(this.isQuanX())t.method="POST",this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t));else if(this.isNode()){this.initGotEnv(t);const{url:s,...i}=t;this.got.post(s,i).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>{const{message:s,response:i}=t;e(s,i,i&&i.body)})}}time(t){let e={"M+":(new Date).getMonth()+1,"d+":(new Date).getDate(),"H+":(new Date).getHours(),"m+":(new Date).getMinutes(),"s+":(new Date).getSeconds(),"q+":Math.floor(((new Date).getMonth()+3)/3),S:(new Date).getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,((new Date).getFullYear()+"").substr(4-RegExp.$1.length)));for(let s in e)new RegExp("("+s+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?e[s]:("00"+e[s]).substr((""+e[s]).length)));return t}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl;return{"open-url":e,"media-url":s}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};this.isMute||(this.isSurge()||this.isLoon()?$notification.post(e,s,i,o(r)):this.isQuanX()&&$notify(e,s,i,o(r)));let h=["","==============\ud83d\udce3\u7cfb\u7edf\u901a\u77e5\ud83d\udce3=============="];h.push(e),s&&h.push(s),i&&h.push(i),console.log(h.join("\n")),this.logs=this.logs.concat(h)}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t.stack):this.log("",`\u2757\ufe0f${this.name}, \u9519\u8bef!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`\ud83d\udd14${this.name}, \u7ed3\u675f! \ud83d\udd5b ${s} \u79d2`),this.log(),(this.isSurge()||this.isQuanX()||this.isLoon())&&$done(t)}}(t,e)}
