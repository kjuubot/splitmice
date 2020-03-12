class Api::ExpensesController < ApplicationController
    def create
        num_recipients = (!params[:recipients].nil? ? params[:recipients].length : 1)

        split = expense_params[:amount].to_f / num_recipients

        @expense = Expense.new(amount: expense_params[:amount].to_i,
            title: expense_params[:title],
            date: expense_params[:date],
            creator_id: current_user.id,
            num_people: num_recipients,
            )

        if @expense.save
            expense_params[:recipients].each do |id|
                Split.create(expense_id: @expense.id, recipient_id: id.to_i, split_amount: split.round(2) )
        end

        @expenses = current_user.net_payments(current_user.id)
            render json: @expenses.to_json
        else
            render json: @expense.errors.full_messages, status: 422
        end
    end

    def getExpenses
        @expenses = current_user.net_payments(current_user.id)
        render json: @expenses.to_json
    end

    def update
        new_split_info = current_user.settle_up(expense_params[:settleUpFrom].to_i, expense_params[:settleUpTo].to_i, expense_params[:amount].to_f)

        paid_and_other_list = find_paid_splits(new_split_info)

        if paid_and_other_list[0][0].kind_of?(Array)
            paid_split_ids = paid_and_other_list[0].collect { |idx| idx[0] }
        else
            if paid_and_other_list[0].first == nil
                paid_split_ids = []
            else
                paid_split_ids = [paid_and_other_list[0].first]
            end
        end

        if paid_split_ids.length > 0
        Split.where(id: paid_split_ids).update_all(recipient_paid: true, split_amount: 0)
        end

        if paid_and_other_list[1].length > 0
        uneven_payment(paid_and_other_list[1])
        end

        expense_paid_info = current_user.expense_paid

        Expense.where(id: expense_paid_info).update_all(paid: true)

        @expenses = current_user.net_payments(current_user.id)
        render json: @expenses.to_json
    end

    def find_paid_splits(array)
        counter = 0

        array.each do |split|
            if split[2] == 0
                counter += 1
            end
        end

        if counter == 0
            return array.unshift([])
        else
            paid_splits = array.slice(0, counter)

            if array.length > counter
                paid_splits.push(array[array.length - 1])
            else
                paid_splits.push([])
            end

            paid_splits
        end
    end

    def uneven_payment(split)
        if split[0].is_a? Integer
            Split.find(split[0]).update(recipient_paid: split[1], split_amount: split[2])
        elsif split[0].is_a? String
            new_expense = Expense.create(amount: split[2],
                                    title:"Overpayment",
                                    date: Time.now.strftime("%Y/%m/%d").gsub(/\//,'-'),
                                    creator_id: expense_params[:settleUpFrom],
                                    split: 2
                                    )
            Split.create(expense_id: new_expense.id, recipient_id: expense_params[:settleUpTo], split_amount: split[2])
        end
    end

    private

    def expense_params
        params.require(:expenses).permit(:title, :amount, {:recipients => []}, :date, :settleUpFrom, :settleUpTo)
    end
end