-- ============================================================
-- YutuHub Database Schema (v1)
-- ============================================================
-- Tables: users, categories, posts, comments,
--         likes, favorites, reports, achievements
-- ============================================================

-- ----------------------------------------------------------
-- users
-- ----------------------------------------------------------
CREATE TABLE users (
    user_id        BIGINT  PRIMARY KEY AUTO_INCREMENT COMMENT '主键 ID',
    nickname       VARCHAR(50)  NOT NULL COMMENT '显示昵称',
    avatar         VARCHAR(500) NULL     COMMENT '头像 URL',
    anonymous_name VARCHAR(50)  NULL     COMMENT '匿名显示名 (随机生成)',
    phone          VARCHAR(20)  NULL     COMMENT '手机号（后续微信登录绑定）',
    email          VARCHAR(100) NULL     COMMENT '邮箱',
    role           TINYINT      NOT NULL DEFAULT 0 COMMENT '0=普通用户 1=管理员 2=超级管理员',
    is_verified    TINYINT      NOT NULL DEFAULT 0 COMMENT '是否实名认证',
    status         TINYINT      NOT NULL DEFAULT 1 COMMENT '0=禁用 1=正常',
    created_at     DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
    updated_at     DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',
    INDEX idx_nickname (nickname),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '用户表';

-- ----------------------------------------------------------
-- categories
-- ----------------------------------------------------------
CREATE TABLE categories (
    id          INT  PRIMARY KEY AUTO_INCREMENT COMMENT '主键 ID',
    name        VARCHAR(50)  NOT NULL COMMENT '分类名称',
    description VARCHAR(200) NULL     COMMENT '分类描述',
    icon        VARCHAR(20)  NULL     COMMENT '图标 (emoji 或 SVG)',
    parent_id   INT          NULL     COMMENT '父分类 ID (NULL 表示顶级)',
    sort_order  INT          NOT NULL DEFAULT 0 COMMENT '排序权重',
    is_active   TINYINT      NOT NULL DEFAULT 1 COMMENT '0=禁用 1=启用',
    created_at  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
    INDEX idx_parent (parent_id),
    INDEX idx_sort (sort_order),
    INDEX idx_active (is_active)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '帖子分类表';

-- ----------------------------------------------------------
-- posts
-- ----------------------------------------------------------
CREATE TABLE posts (
    id           BIGINT  PRIMARY KEY AUTO_INCREMENT COMMENT '主键 ID',
    user_id      BIGINT  NOT NULL COMMENT '发布者 ID',
    category_id  INT     NOT NULL COMMENT '分类 ID',
    title        VARCHAR(200) NOT NULL COMMENT '标题',
    content      TEXT    NOT NULL COMMENT '正文内容',
    images       JSON    NULL     COMMENT '图片 URL 数组 (JSON)',
    price        VARCHAR(50) NULL  COMMENT '价格或服务起价',
    is_anonymous TINYINT NOT NULL DEFAULT 0 COMMENT '0=实名 1=匿名',
    status       TINYINT NOT NULL DEFAULT 1 COMMENT '0=待审核 1=正常 2=已删除 3=已下架',
    views        INT     NOT NULL DEFAULT 0 COMMENT '浏览次数',
    like_count   INT     NOT NULL DEFAULT 0 COMMENT '点赞数',
    favorite_count INT   NOT NULL DEFAULT 0 COMMENT '收藏数',
    comment_count INT  NOT NULL DEFAULT 0 COMMENT '评论数',
    created_at   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
    updated_at   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3) COMMENT '更新时间',
    INDEX idx_user (user_id),
    INDEX idx_category (category_id),
    INDEX idx_status (status),
    INDEX idx_created (created_at),
    INDEX idx_like_count (like_count),
    INDEX idx_views (views),
    FULLTEXT KEY ft_title_content (title, content)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '帖子表';

-- ----------------------------------------------------------
-- comments
-- ----------------------------------------------------------
CREATE TABLE comments (
    id         BIGINT  PRIMARY KEY AUTO_INCREMENT COMMENT '主键 ID',
    post_id    BIGINT  NOT NULL COMMENT '帖子 ID',
    user_id    BIGINT  NOT NULL COMMENT '评论者 ID',
    parent_id  BIGINT  NULL     COMMENT '父评论 ID (NULL 表示一楼)',
    content    TEXT    NOT NULL COMMENT '评论内容',
    status     TINYINT NOT NULL DEFAULT 1 COMMENT '0=删除 1=正常',
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
    INDEX idx_post (post_id),
    INDEX idx_user (user_id),
    INDEX idx_parent (parent_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '评论表';

-- ----------------------------------------------------------
-- likes
-- ----------------------------------------------------------
CREATE TABLE likes (
    id         BIGINT  PRIMARY KEY AUTO_INCREMENT COMMENT '主键 ID',
    user_id    BIGINT  NOT NULL COMMENT '点赞者 ID',
    post_id    BIGINT  NOT NULL COMMENT '帖子 ID',
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
    UNIQUE KEY uk_user_post (user_id, post_id),
    INDEX idx_post (post_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '点赞表';

-- ----------------------------------------------------------
-- favorites
-- ----------------------------------------------------------
CREATE TABLE favorites (
    id         BIGINT  PRIMARY KEY AUTO_INCREMENT COMMENT '主键 ID',
    user_id    BIGINT  NOT NULL COMMENT '收藏者 ID',
    post_id    BIGINT  NOT NULL COMMENT '帖子 ID',
    created_at DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
    UNIQUE KEY uk_user_post (user_id, post_id),
    INDEX idx_post (post_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '收藏表';

-- ----------------------------------------------------------
-- reports
-- ----------------------------------------------------------
CREATE TABLE reports (
    id          BIGINT  PRIMARY KEY AUTO_INCREMENT COMMENT '主键 ID',
    reporter_id BIGINT  NOT NULL COMMENT '举报人 ID',
    target_type TINYINT NOT NULL COMMENT '1=帖子 2=评论 3=用户',
    target_id   BIGINT  NOT NULL COMMENT '目标 ID',
    reason      VARCHAR(500) NOT NULL COMMENT '举报原因',
    status      TINYINT NOT NULL DEFAULT 0 COMMENT '0=待处理 1=已解决 2=已驳回',
    resolution  VARCHAR(500) NULL     COMMENT '处理结果',
    resolved_by BIGINT  NULL           COMMENT '处理管理员 ID',
    resolved_at DATETIME(3) NULL     COMMENT '处理时间',
    created_at  DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
    INDEX idx_reporter (reporter_id),
    INDEX idx_target (target_type, target_id),
    INDEX idx_status (status)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '举报表';

-- ----------------------------------------------------------
-- achievements
-- ----------------------------------------------------------
CREATE TABLE achievements (
    id          INT  PRIMARY KEY AUTO_INCREMENT COMMENT '主键 ID',
    code        VARCHAR(50)  NOT NULL UNIQUE COMMENT '成就标识码 (唯一)',
    name        VARCHAR(100) NOT NULL COMMENT '成就名称',
    description VARCHAR(300) NULL     COMMENT '描述',
    icon        VARCHAR(20)  NULL     COMMENT '图标 (emoji 或 SVG)',
    criteria    VARCHAR(200) NOT NULL COMMENT '达成条件 (JSON 描述)',
    points      INT          NOT NULL DEFAULT 0 COMMENT '积分',
    tier        INT          NOT NULL DEFAULT 1 COMMENT '等级',
    is_active   TINYINT      NOT NULL DEFAULT 1 COMMENT '0=禁用 1=启用',
    created_at  DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '创建时间',
    UNIQUE KEY uk_code (code)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '成就定义表';

-- ----------------------------------------------------------
-- user_achievements (多对多: 用户获得的成就)
-- ----------------------------------------------------------
CREATE TABLE user_achievements (
    id          BIGINT  PRIMARY KEY AUTO_INCREMENT COMMENT '主键 ID',
    user_id     BIGINT  NOT NULL COMMENT '用户 ID',
    achievement_id INT  NOT NULL COMMENT '成就 ID',
    earned_at   DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3) COMMENT '获得时间',
    UNIQUE KEY uk_user_achievement (user_id, achievement_id),
    INDEX idx_achievement (achievement_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT '用户成就关联表';
