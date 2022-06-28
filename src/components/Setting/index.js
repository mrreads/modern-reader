import { useTranslation } from 'react-i18next';

export default () => {
    const { t } = useTranslation('setting');

    return (
        <h1> { t('title') } </h1>
    )
}