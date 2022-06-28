import { useTranslation } from 'react-i18next';

export default () => {
    const { t } = useTranslation('library');

    return (
        <h1> { t('title') } </h1>
    )
}