import React from 'react'
import { useTranslation } from 'react-i18next'

const ForgerFavorites = () => {

    const { t } = useTranslation()

    return (
        <div>

            <p>{t("forgerFavoritesItem")}</p>

        </div>
    )
}

export default ForgerFavorites