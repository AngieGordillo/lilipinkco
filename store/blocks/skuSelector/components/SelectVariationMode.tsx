import React from 'react'
import { Dropdown } from 'vtex.styleguide'
import { injectIntl, defineMessages, IntlShape } from 'react-intl'

import styles from '../styles.css'
import { DisplayOption } from '../types'

const DropdownCustom: any = Dropdown;

interface VariationSelectModeProps {
  intl: IntlShape
  selectedItem: string | null
  displayOptions: DisplayOption[]
}

const messages = defineMessages({
  selectPlaceholder: {
    id: 'store/sku-selector.select.placeholder',
    defaultMessage: '',
  },
})

function SelectVariationMode(props: VariationSelectModeProps) {
  const { intl, selectedItem, displayOptions } = props

  const options = displayOptions.map(op => ({
    label: op.label,
    value: op.label,
  }))

  const handleClick = (_: React.MouseEvent, value: string) => {
    const reducedOptions = displayOptions.reduce<Record<string, DisplayOption>>(
      (acc, cur) => {
        acc[cur.label] = cur

        return acc
      },
      {}
    )

    return reducedOptions[value].onSelectItem()
  }

  return (
    <div className={styles.skuSelectorSelectContainer}>
      <DropdownCustom
        options={options}
        value={selectedItem}
        onChange={handleClick}
        placeholder={(intl as any).formatMessage(messages.selectPlaceholder)}
      />
    </div>
  )
}

export default injectIntl(SelectVariationMode)
