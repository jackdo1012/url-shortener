const pool = require("../config/DB");
class MainController {
    async index(_, res) {
        try {
            const full = await pool.query("SELECT * FROM url_list");
            res.render("index", { data: full.rows });
        } catch (error) {
            console.log(error);
        }
    }
    async redirect(req, res) {
        const { slug } = req.params;
        const slugFind = await pool.query(
            "SELECT * FROM url_list WHERE slug = $1",
            [slug]
        );
        if (slugFind.rows.length > 0) {
            return res.redirect(slugFind.rows[0].link);
        }
        return res.redirect("/");
    }
    async add(req, res) {
        try {
            let { slug, link } = req.body;
            const check = /['"]|(--)| /;
            if (slug === "" || link === "") {
                return res.redirect("/");
            }
            const slugFind = await pool.query(
                "SELECT * FROM url_list WHERE slug = $1",
                [slug]
            );
            switch (true) {
                case check.test(slug):
                case check.test(link):
                    return res.json({
                        success: false,
                        message: `Invalid character`,
                    });
            }
            if (slugFind.rows.length > 0) {
                return res.json({
                    success: false,
                    message: "Slug already exists",
                });
            }
            if (!link.startsWith("http://") && !link.startsWith("https://")) {
                link = `http://${link}`;
            }
            await pool.query(
                "INSERT INTO url_list VALUES (default, $1, $2) RETURNING *",
                [slug, link]
            );
            res.redirect("/");
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = new MainController();
