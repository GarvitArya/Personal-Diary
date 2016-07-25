        var myDropzone;
        Dropzone.options.myAwesomeDropzone = false;
        Dropzone.autoDiscover = false;

        var diary = {
            indexCount: 1,
            memoryCount: 0,
            pageCount: 3, //index + memory + 2
            index: -1,
            flipping: false,
            openCount: 0,
            hasLogin: false,
            newComer: true,
            stage: "cover",
            currC: 1,
            name: "Garvit Arya",
            id: "shinerising",
            icon: 1
        };

        $(document).ready(function () {
            loading(function () {
                $('#butterfly_main').show();
                $('#diary_cover').click(function () {
                    if (diary.stage === "cover") {
                        $('#pen_main').addClass('pen_hide');
                        if ($('#butterfly_main').hasClass('idle')) $('#butterfly_main').removeClass('idle').addClass('leave');
                        turnover(1);
                    }
                });
                $('#pen_main').click(function () {
                    if (diary.stage === "cover") {
                        $('#pen_main').addClass('pen_hide');
                        if ($('#butterfly_main').hasClass('idle')) $('#butterfly_main').removeClass('idle').addClass('leave');
                        turnover(diary.pageCount, function () {
                            showEdit();
                        });
                    }
                });
                setTimeout(function () {
                    $('#butterfly_main').removeClass('fly').addClass('idle');
                }, 10000);
                if (diary.newComer) {
                    setTimeout(function () {
                        showBalloon("1", "4.1", "Click diary cover to start!");
                    }, 1000);
                } else {
                    showBalloon("4.4", "1", "Click pen to start your writing!");
                }
                $('#diary_page_quote').text(quoteData[Math.floor(Math.random() * quoteData.length)]);

                myDropzone = new Dropzone("div#diary_image_upload", {
                    url: "/image-upload",
                    paramName: "imageFile",
                    maxFilesize: 2,
                    maxFiles: 1,
                    acceptedFiles: "image/*",
                    autoProcessQueue: true,
                    init: function () {
                        this.on("addedfile", function (file) {
                            if (file.size < 2 * 1024 * 1024) {
                                $('#diary_uploadicon').hide();
                                $('#diary_edit_image').css("border-color", "white");
                                $('.dz-image').css("opacity", .5);
                                this.processFile(file);
                            } else {
                                showBalloon("3", "2.5", "Image must be less than 2MB!", 3);
                            }
                        });
                        this.on("dragend", function (event) {
                            $('#diary_edit_image').css("border-color", "white");
                        });
                        this.on("dragover", function (event) {
                            $('#diary_edit_image').css("border-color", "lightgreen");
                        });
                        this.on("dragleave", function (event) {
                            $('#diary_edit_image').css("border-color", "white");
                        });
                        this.on("error", function (file, error) {
                            console.log(error);
                            this.removeFile(file);
                            $('#diary_uploadicon').show();
                        });
                        this.on("sending", function (file, obj, data) {
                            $('.dz-image').css("opacity", .5);
                        });
                        this.on("success", function (file, data) {
                            $('.dz-image').css("opacity", 1);
                            $('#diary_image_upload').attr("src", data);
                        });
                    },
                    accept: function (file, done) {}
                });
            });
        });

        $('#diary_last_button').click(function () {
            showEdit();
        });
        $('.diary_update').click(function () {
            showEdit(memoryData[diary.index - diary.indexCount - 1]);
        });
        $('.diary_page_next').click(function () {
            turnover(1);
        });
        $('.diary_page_previous').click(function () {
            turnover(-1);
        });
        $('#butterfly_main').click(function () {
            if ($('#butterfly_main').hasClass('idle')) $('#butterfly_main').removeClass('idle').addClass('leave');
        });
        $('#diary_avatar').click(function () {
            if (!$('#diary_signup').hasClass('hide')) changeAvatar(iconData.current + 1);
        });
        $('.diary_page_weather.diary_edit').click(function () {
            changeWeather(weatherData.current + 1, this);
        });
        $('.diary_page_emotion.diary_edit').click(function () {
            changeEmotion(emotionData.current + 1, this);
        });
        $('#diary_clear').click(function () {
            $('#diary_page_form input').val("");
        });
        $('#diary_bookmark').click(function () {
            if (diary.stage === "index" || diary.stage === "memory" || diary.stage === "last") {
                turnover(diary.index * -1);
            } else if (diary.stage === "first") {
                turnover(-1);
            }
        });
        $('.diary_delete').click(function () {
            $('.diary_attention').removeClass("hide").show();
            $('.diary_apply').removeClass("hide").show();
            $('.diary_cancel').removeClass("hide").show();
            $('.diary_delete').addClass("hide").hide();
            $('.diary_update').addClass("hide").hide();
        });
        $('.diary_cancel').click(function () {
            $('.diary_apply').addClass("hide").hide();
            $('.diary_cancel').addClass("hide").hide();
            $('.diary_delete').removeClass("hide").show();
            $('.diary_update').removeClass("hide").show();
            $('.diary_attention').addClass("hide").hide();
        });
        $('#diary_edit_cancel').click(function () {
            if ($('#diary_edit_attention').hasClass("hide")) {
                $('#diary_edit_attention').removeClass("hide").show();
                $('#diary_edit_apply').text("Leave");
                $('#diary_edit_cancel').text("Go back");
            } else {
                $('#diary_edit_apply').text("Save");
                $('#diary_edit_cancel').text("Cancel");
                $('#diary_edit_attention').addClass("hide").hide();
            }
        });
        $('#diary_info_signup').click(function () {
            showNode('#diary_name');
            $('#diary_name').prop('disabled', false);
            $('#diary_name input').focus();
            showNode('#diary_password_repeat');
            $('#diary_password_repeat').prop('disabled', false);
            showNode('#diary_signup');
            hideNode('#diary_login', true);
            showNode('#diary_info_login');
            showNode('#diary_info_text_login');
            hideNode('#diary_info_signup', true);
            hideNode('#diary_info_text_signup');
            changeAvatar(iconData.current);
            if (diary.openCount == 1) {
                setTimeout(function () {
                    showBalloon(".8", "1.8", "Click here to change your own symbol!");
                }, 1000);
                setTimeout(function () {
                    showBalloon("5.4", "3.5", "Type your info and Sign up!", 1);
                }, 5000);
            }
        });
        $('#diary_info_login').click(function () {
            hideNode('#diary_name');
            $('#diary_name').prop('disabled', true);
            hideNode('#diary_password_repeat');
            $('#diary_password_repeat').prop('disabled', true);
            hideNode('#diary_signup', true);
            $('#diary_id input').focus();
            showNode('#diary_login');
            hideNode('#diary_info_login', true);
            hideNode('#diary_info_text_login');
            showNode('#diary_info_signup');
            showNode('#diary_info_text_signup');
            changeAvatar(-1);
        });

        $('input').on('input', function () {
            $('#diary_signup').removeClass('disabled');
            $('#diary_login').removeClass('disabled');
            if ($('#diary_page_form input').eq(0).val() == "") {
                $('#diary_signup').addClass('disabled');
            }
            if ($('#diary_page_form input').eq(1).val() == "") {
                $('#diary_signup').addClass('disabled');
                $('#diary_login').addClass('disabled');
            }
            if ($('#diary_page_form input').eq(2).val() == "") {
                $('#diary_signup').addClass('disabled');
                $('#diary_login').addClass('disabled');
            }
            if ($('#diary_page_form input').eq(3).val() == "") {
                $('#diary_signup').addClass('disabled');
            }
        })

        $("input").bind("keypress", {}, function (e) {
            var code = (e.KeyCode ? e.KeyCode : e.which);
            if (code == 13) {
                if (!$('#diary_signup').hasClass('hide') && !$('#diary_signup').hasClass('disable')) $('#diary_signup').click();
                else if (!$('#diary_login').hasClass('hide') && !$('#diary_login').hasClass('disable')) $('#diary_login').click();
            }
        });

        $('#diary_id input').focusout(function () {
            if ($('#diary_id input').val() != "") {
                var getData = {
                    "id": $("#diary_id input").val()
                };
                $.get("/exist", getData, null, "json")
                    .done(function (data) {
                        console.log(data);
                        if (data.success == true) {
                            if ($('#diary_signup').hasClass('hide')) {
                                changeAvatar(data.params.icon);
                            } else {
                                showBalloon("5.4", "4", "This ID has been used!", 1);
                            }
                        }
                    });
            }
        });
        $('#diary_signup').click(function () {
            if (!$('#diary_signup').hasClass('disabled')) {
                if ($('#diary_password_repeat input').val() != $('#diary_password input').val()) {
                    showBalloon("5.4", "4.8", "Please type two same passwords!", 1);
                } else {
                    var postData = {
                        "name": $("#diary_name input").val(),
                        "id": $("#diary_id input").val(),
                        "password": sha3_256($("#diary_password input").val()),
                        "icon": iconData.current
                    };
                    $('#diary_formsending').text("Signing Up...");
                    $('#diary_formsending').addClass('shining');
                    showNode('#diary_formsending');
                    hideNode('#diary_info_login', true);
                    hideNode('#diary_signup', true);
                    hideNode('#diary_clear', true);
                    $.post("/signup", postData, null, "json")
                        .done(function (data) {
                            if (data.success) {
                                console.log(data);
                                $('#diary_formsending').text("Sign up Successful!");
                                $('#diary_formsending').removeClass('shining');
                                diary.hasLogin = true;
                                diary.name = data.params.name;
                                diary.id = data.params.id;
                                diary.icon = data.params.icon;
                                diary.newComer = true;
                                changeAvatar(data.params.icon);
                                $('#diary_icon').text(iconData.icons[iconData.current]);
                                $('#diary_title').text(data.params.name.split(" ")[0] + "'s diary");
                                setTimeout(function () {
                                    $('#diary_info_text_logout').text("Logged in as " + data.params.id);
                                    showNode('#diary_info_text_logout');
                                    showNode('#diary_info_logout');
                                    hideNode('#diary_info_text_login', true);
                                    hideNode('#diary_page_form', true);
                                }, 3000);
                                setTimeout(function () {
                                    showNode('#diary_page_quote');
                                    showNode('#diary_first_container .diary_page_next');
                                    setTimeout(function () {
                                        showBalloon("4", "6.8", "Click here to see new page!");
                                    }, 2000);
                                    showNode('#pen_main');
                                }, 4000);
                            } else {
                                $('#diary_formsending').text("Sign up Failed!");
                                $('#diary_formsending').removeClass('shining');
                                if (data.message) {
                                    showBalloon("0", "4", data.message);
                                }
                                setTimeout(function () {
                                    hideNode('#diary_formsending', true);
                                    showNode('#diary_info_login');
                                    showNode('#diary_signup');
                                    showNode('#diary_clear');
                                }, 3000);
                            }
                        }).fail(function () {
                            $('#diary_formsending').text("Sign up Failed!");
                            $('#diary_formsending').removeClass('shining');
                            setTimeout(function () {
                                hideNode('#diary_formsending', true);
                                showNode('#diary_info_login');
                                showNode('#diary_signup');
                                showNode('#diary_clear');
                            }, 3000);
                        });
                }
            }
        });
        $('#diary_login').click(function () {
            if (!$('#diary_login').hasClass('disabled')) {
                var postData = {
                    "id": $("#diary_id input").val(),
                    "password": sha3_256($("#diary_password input").val())
                };
                $('#diary_formsending').text("Logging in...");
                $('#diary_formsending').addClass('shining');
                showNode('#diary_formsending');
                hideNode('#diary_info_signup', true);
                hideNode('#diary_login', true);
                hideNode('#diary_clear', true);
                $.post("/login", postData, null, "json")
                    .done(function (data) {
                        if (data.success) {
                            console.log(data);
                            $('#diary_formsending').text("Log in Successful!");
                            $('#diary_formsending').removeClass('shining');
                            diary.hasLogin = true;
                            diary.name = data.params.name;
                            diary.id = data.params.id;
                            diary.icon = data.params.icon;
                            diary.newComer = false;
                            changeAvatar(data.params.icon);
                            $('#diary_icon').text(iconData.icons[iconData.current]);
                            $('#diary_title').text(data.params.name.split(" ")[0] + "'s diary");
                            setTimeout(function () {
                                $('#diary_info_text_logout').text("Logged in as " + data.params.id);
                                showNode('#diary_info_text_logout');
                                showNode('#diary_info_logout');
                                hideNode('#diary_info_text_signup', true);
                                hideNode('#diary_page_form', true);
                            }, 3000);
                            setTimeout(function () {
                                showNode('#diary_page_quote');
                                getMemories(function () {
                                    showNode('#diary_first_container .diary_page_next');
                                    showNode('#pen_main');
                                }, null);
                            }, 4000);
                        } else {
                            $('#diary_formsending').text("Log in Failed!");
                            $('#diary_formsending').removeClass('shining');
                            if (data.message) {
                                showBalloon("0", "4", data.message);
                            }
                            setTimeout(function () {
                                hideNode('#diary_formsending', true);
                                showNode('#diary_info_signup');
                                showNode('#diary_login');
                                showNode('#diary_clear');
                            }, 3000);
                        }
                    })
                    .fail(function () {
                        $('#diary_formsending').text("Log in Failed!");
                        $('#diary_formsending').removeClass('shining');
                        setTimeout(function () {
                            hideNode('#diary_formsending', true);
                            showNode('#diary_info_signup');
                            showNode('#diary_login');
                            showNode('#diary_clear');
                        }, 3000);
                    });
            }
        });
        $('#diary_info_logout').click(function () {
            $.get("/logout", null, null, "json")
                .done(function (data) {
                    console.log(data);
                    location.reload();
                });
        });

        $('#diary_edit_apply').click(function () {
            if ($('#diary_edit_attention').hasClass("hide")) {
                if ($('#diary_title_edit').val() == "") {
                    showBalloon("-1", "0", "Please type a title!");
                } else if ($('#diary_content_edit').val() == "") {
                    showBalloon("-1", "3", "Please write something!");
                } else {
                    if (diary.stage == "addnew") {
                        $('#diary_edit_attention').text("Saving your memory now...").removeClass("hide").show();
                        $('#diary_edit_apply').addClass('hide').hide();
                        $('#diary_edit_cancel').addClass('hide').hide();
                        var postData = {
                            "title": $('#diary_title_edit').val(),
                            "subtitle": $('#diary_subtitle_edit').val(),
                            "content": $('#diary_content_edit').val(),
                            "image": $('#diary_image_upload').attr("src"),
                            "date": $(".diary_page_date.diary_edit").text(),
                            "day": $(".diary_page_day.diary_edit").text(),
                            "weather": weatherData.current,
                            "emotion": emotionData.current,
                        };
                        $.post("/addnew", postData, null, "json")
                            .done(function (data) {
                                console.log(data);
                                if (data.success) {
                                    $('#diary_edit_attention').text("Really leave without saving?");
                                    $('#diary_edit_apply').removeClass('hide').show();
                                    $('#diary_edit_cancel').removeClass('hide').show();
                                    postData._id = data.params._id;
                                    addMemory(postData);
                                } else {
                                    $('#diary_edit_attention').text("Saving your memory failed...");
                                    if (data.message) {
                                        showBalloon("0", "4", data.message);
                                    }
                                    setTimeout(function () {
                                        $('#diary_edit_attention').text("Really leave without saving?").addClass('hide').hide();
                                        $('#diary_edit_apply').removeClass('hide').show();
                                        $('#diary_edit_cancel').removeClass('hide').show();
                                    }, 3000);
                                }
                            })
                            .fail(function () {
                                $('#diary_edit_attention').text("Please check your network...");
                                setTimeout(function () {
                                    $('#diary_edit_attention').text("Really leave without saving?").addClass('hide').hide();
                                    $('#diary_edit_apply').removeClass('hide').show();
                                    $('#diary_edit_cancel').removeClass('hide').show();
                                }, 3000);
                            });
                    } else {
                        $('#diary_edit_attention').text("Updating your memory now...").removeClass("hide").show();
                        $('#diary_edit_apply').addClass('hide').hide();
                        $('#diary_edit_cancel').addClass('hide').hide();
                        var postData = {
                            "title": $('#diary_title_edit').val(),
                            "subtitle": $('#diary_subtitle_edit').val(),
                            "content": $('#diary_content_edit').val(),
                            "image": $('#diary_image_upload').attr("src"),
                            "date": $(".diary_page_date.diary_edit").text(),
                            "day": $(".diary_page_day.diary_edit").text(),
                            "weather": weatherData.current,
                            "emotion": emotionData.current,
                            "_id": memoryData[diary.index - diary.indexCount - 1]._id
                        };
                        $.post("/update", postData, null, "json")
                            .done(function (data) {
                                console.log(data);
                                if (data.success) {
                                    $('#diary_edit_attention').text("Really leave without saving?");
                                    $('#diary_edit_apply').removeClass('hide').show();
                                    $('#diary_edit_cancel').removeClass('hide').show();
                                    postData._id = data.params._id;
                                    updateMemory(postData);
                                } else {
                                    $('#diary_edit_attention').text("Updating your memory failed...");
                                    if (data.message) {
                                        showBalloon("0", "4", data.message);
                                    }
                                    setTimeout(function () {
                                        $('#diary_edit_attention').text("Really leave without saving?").addClass('hide').hide();
                                        $('#diary_edit_apply').removeClass('hide').show();
                                        $('#diary_edit_cancel').removeClass('hide').show();
                                    }, 3000);
                                }
                            })
                            .fail(function () {
                                $('#diary_edit_attention').text("Please check your network...");
                                setTimeout(function () {
                                    $('#diary_edit_attention').text("Really leave without saving?").addClass('hide').hide();
                                    $('#diary_edit_apply').removeClass('hide').show();
                                    $('#diary_edit_cancel').removeClass('hide').show();
                                }, 3000);
                            });
                    }
                }
            } else {
                $('#diary_edit_container').hide();
                if (diary.index === diary.pageCount - 1) {
                    diary.stage = "last";
                } else {
                    diary.stage = "memory";
                }
            }
        });
        $('.diary_apply').click(function () {
            $('.diary_attention').text("Deleting your memory now...").removeClass("hide").show();
            $('.diary_apply').addClass('hide').hide();
            $('.diary_cancel').addClass('hide').hide();
            var postData = {
                "_id": memoryData[diary.index - diary.indexCount - 1]._id
            };
            $.post("/delete", postData, null, "json")
                .done(function (data) {
                    console.log(data);
                    if (data.success) {
                        deleteMemory();
                        setTimeout(function () {
                            $('.diary_attention').text("Really want to DELETE this page?").addClass("hide").hide();
                            $('.diary_delete').removeClass("hide").show();
                            $('.diary_update').removeClass("hide").show();
                        }, 500);
                    } else {
                        $('.diary_attention').text("Deleting your memory failed...");
                        if (data.message) {
                            showBalloon("0", "4", data.message);
                        }
                        setTimeout(function () {
                            $('.diary_attention').text("Really want to DELETE this page?").addClass('hide').hide();
                            $('.diary_delete').removeClass("hide").show();
                            $('.diary_update').removeClass("hide").show();
                        }, 3000);
                    }
                })
                .fail(function () {
                    $('.diary_attention').text("Please check your network...");
                    setTimeout(function () {
                        $('.diary_attention').text("Really want to DELETE this page?").addClass('hide').hide();
                        $('.diary_delete').removeClass("hide").show();
                        $('.diary_update').removeClass("hide").show();
                    }, 3000);
                });
        });