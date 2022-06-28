import { useTranslation } from 'react-i18next';

const Library = () => {
    const { t } = useTranslation('library');

    return (
        <h1> { t('title') } </h1>
    )
}

export default Library;